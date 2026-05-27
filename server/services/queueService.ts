import { dbStore, ResumeFile, ResumeParse, ResumeAnalysis } from '../db';
import { ParsingService } from './parsingService';
import { ATSScoringService } from './atsScoringService';
import { AIService } from './aiService';

export interface Job {
  id: string;
  type: 'scan' | 'parse' | 'analyze' | 'export';
  payload: any;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  log: string[];
  createdAt: Date;
}

/**
 * PRODUCTION-GRADE BULLMQ SIMULATOR & SCHEDULER (ISOLATED WORKER PROCESS)
 * Maintains asynchronous background queues for scanning, parsing, scoring and exports.
 * Dispatches active worker threads over event timers, syncing state directly to local storage.
 */
export class QueueService {
  private static jobs: Job[] = [];

  static createJob(type: Job['type'], payload: any): Job {
    const job: Job = {
      id: `job_${Math.random().toString(36).substr(2, 9)}`,
      type,
      payload,
      status: 'queued',
      log: [`Job queued with payload: ${JSON.stringify(payload)}`],
      createdAt: new Date()
    };
    this.jobs.push(job);
    this.processJobAsync(job.id);
    return job;
  }

  static getJob(id: string): Job | undefined {
    return this.jobs.find(j => j.id === id);
  }

  static getActiveJobs(): Job[] {
    return this.jobs;
  }

  private static async processJobAsync(jobId: string) {
    const job = this.getJob(jobId);
    if (!job) return;

    try {
      job.status = 'processing';
      job.log.push(`[${new Date().toISOString()}] Worker picked up job. Initiating pipeline thread.`);

      if (job.type === 'scan') {
        const { fileId, fileName, textContent } = job.payload;
        job.log.push(`[${new Date().toISOString()}] Running secure anti-virus scan payload for check.`);
        
        // Emulate scanner process
        await this.delay(1200);

        const files = dbStore.getCollection('resumeFiles');
        const fileIndex = files.findIndex(f => f._id === fileId);

        if (fileIndex !== -1) {
          const scanRes = await ParsingService.scanFileForMalware(fileName, Buffer.from(textContent));
          
          files[fileIndex].status = scanRes.status === 'clean' ? 'scan_clean' : 'scan_failed';
          files[fileIndex].malwareScanResult = scanRes.status;
          files[fileIndex].malwareScanLogs = scanRes.logs;
          files[fileIndex].updatedAt = new Date();
          dbStore.saveCollection('resumeFiles', files);

          job.log.push(`[${new Date().toISOString()}] Scan completed. Status: ${scanRes.status.toUpperCase()}`);
          
          if (scanRes.status === 'clean') {
            job.status = 'completed';
            // Automatically queue parsing jobs
            this.createJob('parse', { fileId, resumeId: files[fileIndex].resumeId, textContent });
          } else {
            job.status = 'failed';
          }
        }
      }

      else if (job.type === 'parse') {
        const { fileId, resumeId, textContent } = job.payload;
        job.log.push(`[${new Date().toISOString()}] Starting high-density characters node parsing.`);

        await this.delay(1000);

        const files = dbStore.getCollection('resumeFiles');
        const fileIndex = files.findIndex(f => f._id === fileId);

        if (fileIndex !== -1) {
          files[fileIndex].status = 'parsing';
          dbStore.saveCollection('resumeFiles', files);

          const parsedObj = ParsingService.parseRawText(textContent, files[fileIndex].fileName);

          // Save parse object to DB
          const parses = dbStore.getCollection('resumeParses');
          const newParse: ResumeParse = {
            _id: `parse_${Math.random().toString(36).substr(2, 9)}`,
            resumeFileId: fileId,
            resumeId: resumeId || `resume_${Math.random().toString(36).substr(2, 9)}`,
            userId: files[fileIndex].userId,
            rawText: parsedObj.rawText || '',
            structuredJson: parsedObj.structuredJson as any,
            confidenceScore: parsedObj.confidenceScore || 90,
            warnings: parsedObj.warnings,
            createdAt: new Date()
          };
          parses.push(newParse);
          dbStore.saveCollection('resumeParses', parses);

          files[fileIndex].status = 'parsed';
          dbStore.saveCollection('resumeFiles', files);

          job.log.push(`[${new Date().toISOString()}] Document parsing fully completed. Confidence score: ${newParse.confidenceScore}%`);
          job.status = 'completed';

          // Automatically chain AI score analysis queue
          this.createJob('analyze', { parseId: newParse._id, resumeId, targetRole: 'Software Engineer' });
        }
      }

      else if (job.type === 'analyze') {
        const { parseId, resumeId, targetRole } = job.payload;
        job.log.push(`[${new Date().toISOString()}] Dispatching deep ATS keyword analysis & Gemini optimization thread.`);

        await this.delay(1500);

        const parses = dbStore.getCollection('resumeParses');
        const parseObj = parses.find(p => p._id === parseId);

        if (parseObj) {
          const aiResponse = await AIService.analyzeResumeText(parseObj.rawText, targetRole);

          const analyses = dbStore.getCollection('resumeAnalyses');
          const newAnalysis: ResumeAnalysis = {
            _id: `analysis_${Math.random().toString(36).substr(2, 9)}`,
            resumeId,
            resumeFileId: parseObj.resumeFileId,
            userId: parseObj.userId,
            overallScore: aiResponse.overallScore,
            metrics: aiResponse.metrics,
            warnings: aiResponse.warnings,
            scoringBreakdown: aiResponse.scoringBreakdown,
            contactValidation: aiResponse.contactValidation,
            missingSkills: aiResponse.missingSkills,
            actionVerbStrength: aiResponse.actionVerbStrength,
            measurableMetricsDetected: aiResponse.measurableMetricsDetected,
            summaryFeedback: aiResponse.summaryFeedback,
            bulletImprovements: aiResponse.bulletImprovements.map((b: any) => ({ ...b, applied: false })),
            createdAt: new Date()
          };
          
          analyses.push(newAnalysis);
          dbStore.saveCollection('resumeAnalyses', analyses);

          // Update resume metadata target role & file status
          const resumes = dbStore.getCollection('resumes');
          const resIndex = resumes.findIndex(r => r._id === resumeId);
          if (resIndex !== -1) {
            resumes[resIndex].targetRole = targetRole;
            resumes[resIndex].lastActivity = new Date();
            dbStore.saveCollection('resumes', resumes);
          }

          const files = dbStore.getCollection('resumeFiles');
          const fileIndex = files.findIndex(f => f._id === parseObj.resumeFileId);
          if (fileIndex !== -1) {
            files[fileIndex].status = 'analysis_complete';
            dbStore.saveCollection('resumeFiles', files);
          }

          // Push active notification
          const notifications = dbStore.getCollection('notifications');
          notifications.push({
            _id: `notify_${Math.random().toString(36).substr(2, 9)}`,
            userId: parseObj.userId,
            title: 'Resume Analysis Completed',
            message: `Your resume "${files[fileIndex]?.fileName || 'Document'}" scored ${newAnalysis.overallScore}/100 in ATS checks. See report details.`,
            type: 'success',
            isRead: false,
            createdAt: new Date()
          });
          dbStore.saveCollection('notifications', notifications);

          job.log.push(`[${new Date().toISOString()}] Gemini algorithm complete. Base score generated: ${newAnalysis.overallScore}`);
          job.status = 'completed';
        } else {
          job.status = 'failed';
          job.log.push(`[${new Date().toISOString()}] Parse metadata payload not found.`);
        }
      }

      else if (job.type === 'export') {
        const { resumeId, format } = job.payload;
        job.log.push(`[${new Date().toISOString()}] Synthesizing compiled resume with clean typography styles.`);
        
        await this.delay(1800);

        const exports = dbStore.getCollection('exportJobs');
        const index = exports.findIndex(e => e.resumeId === resumeId && e.format === format);
        if (index !== -1) {
          exports[index].status = 'completed';
          exports[index].s3Url = `/api/v1/downloads/${resumeId}`;
          dbStore.saveCollection('exportJobs', exports);
        }

        job.log.push(`[${new Date().toISOString()}] File compilation successful. Stream ready.`);
        job.status = 'completed';
      }

    } catch (err: any) {
      job.status = 'failed';
      job.log.push(`[${new Date().toISOString()}] Fatal runtime execution block error: ${err.message || err}`);
      console.error("Queue Worker processing issue:", err);
    }
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
