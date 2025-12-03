# Quick Start: Deploy Client to GCP Cloud Run

## Problem Fixed
The original error `COPY failed: file not found in build context or excluded by .dockerignore: stat yarn.lock: file does not exist` was caused by the build context being set incorrectly.

## Solution
Moved `cloudbuild.yaml` to the repository root as `cloudbuild.client.yaml` to ensure the build context starts from the monorepo root where `yarn.lock`, `package.json`, and `.yarnrc.yml` are located.

## Quick Deploy Steps

### 1. Configure Cloud Build Trigger

**Using gcloud CLI:**
```bash
gcloud builds triggers create github \
  --name="manumaharani-client-deploy" \
  --repo-name="Manu-Maharani" \
  --repo-owner="YOUR_GITHUB_USERNAME" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.client.yaml" \
  --region="asia-south1"
```

**Using GCP Console:**
1. Go to Cloud Build > Triggers
2. Click "Create Trigger"
3. Set **Build configuration file**: `cloudbuild.client.yaml`
4. Set **Branch**: `main` (or your preferred branch)
5. Click "Create"

### 2. Manual Deployment (Optional)

From the repository root:
```bash
gcloud builds submit \
  --config=cloudbuild.client.yaml \
  --substitutions=COMMIT_SHA=$(git rev-parse HEAD)
```

### 3. Verify Deployment

After deployment completes:
```bash
gcloud run services describe manumaharani-client \
  --region=asia-south1 \
  --format="value(status.url)"
```

## Key Files Modified

1. **`cloudbuild.client.yaml`** (NEW - at repo root)
   - Build configuration for Cloud Build
   - Uses repo root as build context
   - References `apps/client/Dockerfile`

2. **`apps/client/Dockerfile`** (UPDATED)
   - Removed unnecessary `.yarn` directory copy
   - Multi-stage build: deps → builder → runner
   - Uses Yarn 4 with node-modules linker

3. **`.dockerignore`** (at repo root)
   - Excludes `apps/admin` to reduce build context
   - Keeps necessary files: `yarn.lock`, `.yarnrc.yml`, etc.

## File Structure
```
Manu-Maharani/
├── cloudbuild.client.yaml    ← NEW: Cloud Build config
├── .dockerignore              ← Root dockerignore
├── package.json               ← Root package.json
├── yarn.lock                  ← Root yarn.lock
├── .yarnrc.yml                ← Yarn config
├── turbo.json                 ← Turborepo config
└── apps/
    └── client/
        ├── Dockerfile         ← UPDATED: Docker build
        ├── next.config.js     ← Has output: "standalone"
        ├── package.json
        └── src/
```

## Environment Variables (if needed)

Set environment variables in Cloud Run:
```bash
gcloud run services update manumaharani-client \
  --region=asia-south1 \
  --set-env-vars="NEXT_PUBLIC_API_URL=https://api.example.com"
```

## Troubleshooting

### Build fails with "file not found"
- Ensure `cloudbuild.client.yaml` is at the repo root
- Verify build context is `.` in the docker build command

### Runtime errors
- Check Cloud Run logs: `gcloud run logs read manumaharani-client --region=asia-south1`
- Verify `next.config.js` has `output: "standalone"`

### Out of memory during build
- Increase machine type in `cloudbuild.client.yaml`:
  ```yaml
  options:
    machineType: "E2_HIGHCPU_8"  # or higher
  ```

## What Changed from Original Setup

| Before | After |
|--------|-------|
| `cloudbuild.yaml` in `apps/client/` | `cloudbuild.client.yaml` at repo root |
| Build context unclear | Build context explicitly set to `.` (repo root) |
| Copied `.yarn` directory | Removed (not needed with node-modules linker) |
| Error: yarn.lock not found | ✅ Fixed: All files accessible from root |

## Next Steps

1. ✅ Push changes to GitHub
2. ✅ Trigger will automatically deploy on push to main
3. ✅ Monitor build in Cloud Build console
4. ✅ Access your app via Cloud Run URL

## Support

For detailed documentation, see `DEPLOY_CLIENT_GCP.md`

