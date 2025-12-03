# Deploy Client to GCP Cloud Run via GitHub (Simplest Method)

This is the easiest way to deploy - just push to GitHub and connect via Cloud Run UI.

## 🚀 Quick Steps

### Step 1: Push Code to GitHub

```bash
cd D:\ManuMaharani\ManuMaharani

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Add client app with Docker config"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/ManuMaharani.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy via Cloud Run UI

1. **Go to Cloud Run Console**
   - Visit: https://console.cloud.google.com/run
   - Click **"CREATE SERVICE"**

2. **Connect to GitHub Repository**
   - Select: **"Continuously deploy from a repository (source-based)"**
   - Click **"SET UP WITH CLOUD BUILD"**
3. **Configure Repository**
   - Click **"MANAGE CONNECTED REPOSITORIES"**
   - Select **GitHub**
   - Authenticate with GitHub
   - Select your repository: `YOUR_USERNAME/ManuMaharani`
   - Click **"CONNECT"**

4. **Build Configuration**
   - **Branch**: `main` (or your branch)
   - **Build Type**: Select **"Dockerfile"**
   - **Source location**: `/apps/client/Dockerfile`
   - **Build context directory**: Leave as `/` (root)

5. **Service Configuration**
   - **Service name**: `manumaharani-client`
   - **Region**: `asia-south1` (Mumbai) or your preferred region
   - **Authentication**: Select **"Allow unauthenticated invocations"**
6. **Container Settings**
   - **Container port**: `8080`
   - **Memory**: `512 MiB` (can increase if needed)
   - **CPU**: `1`
   - **Min instances**: `0` (scale to zero)
   - **Max instances**: `10`

7. **Click "CREATE"**

### Step 3: Automatic Deployments

Every time you push to GitHub, Cloud Run will:

- Automatically detect changes
- Build new Docker image
- Deploy to Cloud Run
- Give you a live URL

---

## 🔄 Update Your App

```bash
# Make changes to your code
# Then commit and push

git add .
git commit -m "Update client app"
git push origin main

# Cloud Run automatically rebuilds and deploys!
```

---

## 📋 Build Configuration Settings (In Cloud Run UI)

When setting up the repository connection, use these settings:

**Build Configuration:**

```
Build type: Dockerfile
Dockerfile path: apps/client/Dockerfile
Build context directory: . (root)
```

**Advanced Settings (Optional):**

```yaml
# If Cloud Run asks for cloudbuild.yaml, it will auto-generate one like:
steps:
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "build",
        "-t",
        "gcr.io/$PROJECT_ID/manumaharani-client",
        "-f",
        "apps/client/Dockerfile",
        ".",
      ]
```

---

## 🎯 What Happens Automatically

1. **Push to GitHub** → Triggers Cloud Build
2. **Cloud Build** → Builds Docker image from `apps/client/Dockerfile`
3. **Cloud Run** → Deploys new image automatically
4. **You get** → Live URL like `https://manumaharani-client-xxxxx.a.run.app`

---

## ✅ Files You Need (Already Created)

- ✅ `apps/client/Dockerfile` - Docker build config
- ✅ `apps/client/.dockerignore` - Exclude files from build
- ✅ `next.config.js` - Updated with `output: "standalone"`

---

## 🔧 Troubleshooting

**Issue: Build fails with "Cannot find module"**

- Make sure Dockerfile is at `apps/client/Dockerfile`
- Build context should be `/` (root of monorepo)

**Issue: "Repository not found"**

- Go to: https://console.cloud.google.com/cloud-build/triggers
- Click "CONNECT REPOSITORY"
- Authorize GitHub access

**Issue: Build timeout**

- In Cloud Build settings, increase timeout to 20 minutes
- Go to: https://console.cloud.google.com/cloud-build/settings

---

## 🎬 Alternative: Cloud Build Trigger (Manual Setup)

If you want more control, create a trigger manually:

1. Go to: https://console.cloud.google.com/cloud-build/triggers
2. Click **"CREATE TRIGGER"**
3. Configure:
   - **Name**: `deploy-client`
   - **Event**: Push to branch
   - **Repository**: Your GitHub repo
   - **Branch**: `^main$`
   - **Build configuration**: Dockerfile
   - **Dockerfile path**: `apps/client/Dockerfile`
   - **Build context**: `/`

---

## 💰 Cost

Same as before:

- **Free tier**: 2M requests/month
- **Low traffic**: $0-5/month
- **Scales to zero**: No cost when idle

---

## 📝 Summary

**Your Workflow:**

1. ✅ Dockerfile already created
2. Push code to GitHub
3. Go to Cloud Run Console → Create Service → Connect GitHub repo
4. Configure: Dockerfile path = `apps/client/Dockerfile`, context = `/`
5. Done! Auto-deploys on every push

**No CLI needed** - everything through GCP UI!
