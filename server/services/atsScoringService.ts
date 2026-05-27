import { ResumeParse } from '../db';

/**
 * PRODUCTION-GRADE ATS SCORING ENGINE
 * Evaluates candidates based on 6 core algorithmic parameters:
 * 1. Keyword Overlap & Density (Comparison weights)
 * 2. Section Completeness (Summary, Experience, Education, Skills)
 * 3. Formatting & Parse Integrity
 * 4. Action Verbs Strength and Action Density
 * 5. Measurable Outcome Density (Quantified metrics, %, $, scale)
 * 6. Contact & Recruiter Risk parameters
 */
export class ATSScoringService {
  static evalAtsScore(parse: Partial<ResumeParse>, targetRole: string = 'Software Engineer'): any {
    const json = parse.structuredJson;
    if (!json) {
      return { overallScore: 10, metrics: {} };
    }

    // Heuristic counters
    const text = parse.rawText || '';
    const wordCount = text.split(/\s+/).length;

    // 1. Keyword Score
    const targetKeywords = this.getKeywordsByRole(targetRole);
    let matchedKeywords = targetKeywords.filter(kw => new RegExp(`\\b${kw}\\b`, 'i').test(text));
    const keywordMatch = Math.round((matchedKeywords.length / targetKeywords.length) * 100);

    // 2. Parsability Score
    const parsability = parse.confidenceScore || 90;

    // 3. Formatting Score
    let formatting = 95;
    if (wordCount < 100) formatting -= 40; // Empty file warning
    if (wordCount > 1500) formatting -= 15; // Too long, bots might truncate
    if (!json.contactInfo?.email) formatting -= 20;

    // 4. Section Completeness
    let sectionsFound = 0;
    if (json.summary && json.summary.length > 30) sectionsFound++;
    if (json.experience && json.experience.length > 0) sectionsFound++;
    if (json.education && json.education.length > 0) sectionsFound++;
    if (json.skills && json.skills.length > 3) sectionsFound++;
    if (json.projects && json.projects.length > 0) sectionsFound++;
    const sectionCompleteness = Math.round((sectionsFound / 5) * 100);

    // 5. Impact Verbs & Measurable Metrics
    const rawBullets = json.experience.flatMap((exp: any) => exp.bullets || []);
    const bulletsCount = rawBullets.length;

    const strongVerbs = ['spearheaded', 'architected', 'engineered', 'compiled', 'optimized', 'led', 'designed', 'established', 'driven', 'scaled', 'implemented', 'orchestrated', 'authored', 'managed'];
    let verbsFound = strongVerbs.filter(verb => new RegExp(`\\b${verb}\\b`, 'i').test(text));
    const impactVerbs = Math.min(100, Math.round((verbsFound.length / Math.max(1, bulletsCount)) * 10 * 10));

    // Heuristics for metrics
    const metricsMatches = text.match(/\b\d+(?:%|\s*percent|x|\s*million\s*dollars|k\b)/gi) || [];
    const metricsCount = metricsMatches.length;
    const measurableMetricsDetected = metricsCount;

    // 6. Readability Out of 100
    let readability = 90;
    if (wordCount > 1000) readability = 75; // Passive dense text

    // Overall Weighted Score
    const overallScore = Math.round(
      (keywordMatch * 0.3) +
      (parsability * 0.2) +
      (formatting * 0.1) +
      (sectionCompleteness * 0.15) +
      (impactVerbs * 0.15) +
      (readability * 0.1)
    );

    const warnings: string[] = [];
    if (keywordMatch < 40) warnings.push(`Low keyword matching against "${targetRole}". Consider adding critical competencies.`);
    if (measurableMetricsDetected === 0) warnings.push('No measurable achievements detected (e.g., percentages, scale, revenue metrics). ATS bots favor impact.');
    if (verbsFound.length < 3) warnings.push('Weak verb structure. Use decisive actions like "Architected" or "Spearheaded" instead of "Worked on".');

    return {
      overallScore,
      metrics: {
        keywordMatch,
        parsability,
        formatting,
        impactVerbs,
        sectionCompleteness,
        readability
      },
      warnings,
      scoringBreakdown: {
        formattingFeedback: formatting > 80 ? 'Structural parsing layouts look clean and standard.' : 'Layout contains non-standard text distribution elements.',
        verbFeedback: verbsFound.length > 3 ? 'Decisive, action-oriented leadership wording throughout.' : 'Verb indicators show high concentration of simple administrative vocabulary.',
        completenessFeedback: sectionCompleteness >= 80 ? 'Full operational profile coverage detected.' : 'Some common core sections (e.g. Projects) are missing.'
      },
      contactValidation: {
        hasPhone: !!json.contactInfo?.phone,
        hasEmail: !!json.contactInfo?.email,
        hasLinkedin: !!json.contactInfo?.linkedin,
        hasAddress: !!json.contactInfo?.location
      },
      missingSkills: targetKeywords.filter(kw => !matchedKeywords.includes(kw)),
      actionVerbStrength: verbsFound.length < 3 ? 'weak' : verbsFound.length < 6 ? 'moderate' : 'strong',
      measurableMetricsDetected
    };
  }

  private static getKeywordsByRole(role: string): string[] {
    const r = role.toLowerCase();
    if (r.includes('product')) {
      return ['Product Lifecycle', 'Agile Roadmap', 'SQL', 'A/B Testing', 'Stakeholder Management', 'Scrum', 'Market Analysis', 'Launch', 'Metrics', 'Core Platform', 'UX Flow'];
    }
    if (r.includes('data')) {
      return ['Python', 'SQL', 'Spark', 'Machine Learning', 'Data Pipelines', 'Pandas', 'TensorFlow', 'ETL', 'Business Intelligence', 'Tableau', 'R'];
    }
    // Default Backend/Software Engineer
    return ['React', 'Node.js', 'Express', 'TypeScript', 'Docker', 'RESTful API', 'MongoDB', 'AWS', 'Kubernetes', 'Scalability', 'Git', 'Agile'];
  }
}
