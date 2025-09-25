# Render Deployment Guide

This project is configured for automatic deployment on Render.com.

## 🚀 Deployment Steps

### Method 1: Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Create account / Sign in
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Choose this repository

3. **Auto-Configuration**
   - Render will automatically detect `render.yaml` 
   - Build command: `npm install && npm run build`
   - Publish directory: `build`
   - Node version: 18.x

### Method 2: Manual Setup

If auto-detection doesn't work:

**Static Site Settings:**
- **Name:** kean-portfolio
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`
- **Node Version:** 18

**Environment Variables:**
- `NODE_VERSION`: 18
- `NPM_VERSION`: 9
- `CI`: false

## 📁 Project Structure

```
my-website/
├── build/              # Production build (auto-generated)
├── public/             # Static assets
├── src/                # Source code
├── render.yaml         # Render configuration
├── .nvmrc              # Node version
├── .env.production     # Production env vars
└── build.sh            # Build script
```

## 🔧 Build Process

1. **Install dependencies** - `npm install`
2. **Build React app** - `npm run build`
3. **Output to build/** - Static files ready for serving

## 🌐 Features

- ✅ **SPA Routing** - All routes redirect to index.html
- ✅ **Security Headers** - XSS protection, content type sniffing prevention
- ✅ **Performance** - Optimized builds, no source maps in production
- ✅ **SEO Ready** - Proper meta tags and structured data

## 🛠 Local Testing

Test production build locally:

```bash
# Build for production
npm run build:production

# Serve locally
npx serve -s build -l 3000
```

## 📝 Environment Variables

Production optimizations in `.env.production`:
- `GENERATE_SOURCEMAP=false` - Smaller bundle size
- `CI=false` - Prevents build failures on warnings
- `INLINE_RUNTIME_CHUNK=false` - Better caching

## 🔄 Updates

To deploy updates:
1. Make changes
2. Commit and push to GitHub
3. Render automatically rebuilds and deploys

## 🚨 Troubleshooting

**Build fails?**
- Check Node version (should be 18.x)
- Verify all dependencies are in package.json
- Check build logs in Render dashboard

**Site not loading?**
- Ensure `build` folder contains index.html
- Check for JavaScript errors in browser console
- Verify routing configuration

**Performance issues?**
- Run `npm run analyze` to inspect bundle size
- Consider code splitting for large components
- Optimize images and assets

## 📊 Deployment URL

After successful deployment, your site will be available at:
`https://your-app-name.onrender.com`

You can also set up a custom domain in Render settings.
