import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/routes';

async function bootstrapServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Global Middlewares for Security and Compliance
  app.use(express.json());
  
  // Custom CORS fallback for local isolation
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Mount clean, versioned REST API handlers first
  app.use('/api', apiRouter);

  let vite: any;

  // Integrate Vite dev server middleware in development to retain fast reload
  if (process.env.NODE_ENV !== 'production') {
    console.log("🚀 Initializing Vite Development Middleware Mode...");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Standard Production Asset pipeline
    console.log("📦 Initializing Standalone Production Asset Pipeline...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const httpServer = app.listen(PORT, '0.0.0.0', () => {
    console.log(`===================================================`);
    console.log(`🚀 ResumeAI Pro Server Running on http://0.0.0.0:${PORT}`);
    console.log(`===================================================`);
  });

  if (process.env.NODE_ENV !== 'production' && vite) {
    httpServer.on('upgrade', (req, socket, head) => {
      vite.ws.handleUpgrade(req, socket, head);
    });
  }
}

bootstrapServer().catch(err => {
  console.error("Critical server boot collapse:", err);
});
