# Deploy Client App to Google Cloud Run

This guide explains how to deploy the client application from the monorepo to Google Cloud Run.

## Prerequisites

1. Google Cloud Project set up
2. Cloud Build API enabled
3. Cloud Run API enabled
4. Artifact Registry or Container Registry enabled
5. GitHub repository connected to Cloud Build

## File Structure

The deployment configuration includes:
- `cloudbuild.client.yaml` - Build configuration at repo root
- `apps/client/Dockerfile` - Multi-stage Docker build
- `apps/client/next.config.js` - Next.js standalone output configured

## Setup Cloud Build Trigger

### Option 1: Using gcloud CLI

```bash
gcloud builds triggers create github \
  --name="manumaharani-client-deploy" \
  --repo-name="Manu-Maharani" \
  --repo-owner="YOUR_GITHUB_USERNAME" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.client.yaml" \
  --region="asia-south1"
```

### Option 2: Using GCP Console

1. Go to Cloud Build > Triggers
2. Click "Create Trigger"
3. Configure:
   - **Name**: `manumaharani-client-deploy`
   - **Event**: Push to a branch
   - **Source**: Connect your GitHub repository
   - **Branch**: `^main$` (or your preferred branch)
   - **Build Configuration**: Cloud Build configuration file
   - **Cloud Build configuration file location**: `cloudbuild.client.yaml`
   - **Service account**: Use default or create a custom one with necessary permissions

4. Click "Create"

## Manual Deployment

To manually trigger a build:

```bash
# From the repository root
gcloud builds submit \
  --config=cloudbuild.client.yaml \
  --substitutions=COMMIT_SHA=$(git rev-parse HEAD) \
  .
```

## Important Notes

### Monorepo Structure
- The build context MUST be the repository root (`.`)
- The Dockerfile path is relative: `apps/client/Dockerfile`
- The Dockerfile expects files at root: `package.json`, `yarn.lock`, `.yarnrc.yml`, `turbo.json`

### Docker Build Context
The `.dockerignore` at the root controls what's excluded:
- `apps/admin` is excluded (not needed for client build)
- `node_modules` are excluded (fresh install in Docker)
- `.next` and build artifacts are excluded

### Environment Variables
If your app needs environment variables:

1. In Cloud Run, set them during deployment:
```bash
gcloud run deploy manumaharani-client \
  --set-env-vars="NEXT_PUBLIC_API_URL=https://api.example.com"
```

2. Or update the `cloudbuild.yaml` to pass build-time variables:
```yaml
# Add to the docker build step
args:
  - "--build-arg"
  - "NEXT_PUBLIC_API_URL=${_NEXT_PUBLIC_API_URL}"
```

### Resource Configuration

Current Cloud Run settings (in `cloudbuild.client.yaml`):
- Memory: 512Mi
- CPU: 1
- Min instances: 0 (scales to zero)
- Max instances: 10
- Port: 8080
- Region: asia-south1

Adjust these based on your needs.

## Troubleshooting

### Issue: "yarn.lock not found"
- **Cause**: Build context is not set to repo root
- **Solution**: Ensure `cloudbuild.client.yaml` is at repo root and build context is `.`

### Issue: Build fails at dependency installation
- **Cause**: Missing workspace dependencies
- **Solution**: Verify all referenced packages in Dockerfile COPY commands exist

### Issue: Runtime error in Cloud Run
- **Cause**: Missing environment variables or incorrect Next.js output mode
- **Solution**: Check Next.js config has `output: "standalone"` and set required env vars

### Issue: 404 errors for static assets
- **Cause**: Static files not copied correctly in Dockerfile
- **Solution**: Verify the COPY commands in the runner stage include `.next/static`

## Monitoring

After deployment:
1. Check Cloud Build logs: https://console.cloud.google.com/cloud-build/builds
2. Check Cloud Run logs: https://console.cloud.google.com/run
3. Monitor application: Use Cloud Monitoring for metrics

## Cost Optimization

1. **Scale to Zero**: Configured with `min-instances: 0`
2. **Right-size resources**: Start with 512Mi memory, adjust based on actual usage
3. **Use CDN**: Consider Cloud CDN for static assets
4. **Optimize builds**: Multi-stage Dockerfile already minimizes image size

## Next Steps

1. Set up custom domain in Cloud Run
2. Configure Cloud CDN for better performance
3. Set up Cloud Monitoring alerts
4. Consider using Secret Manager for sensitive environment variables

