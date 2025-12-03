# Update Cloud Run Trigger to Use Root cloudbuild.yaml

## The Problem

Your Cloud Run trigger is currently pointing to `apps/client/cloudbuild.yaml`, which causes Cloud Build to use `apps/client/` as the context directory. This directory doesn't contain `yarn.lock`, `package.json`, or `.yarnrc.yml` (they're at the repo root).

## The Solution

Update your trigger to use `cloudbuild.client.yaml` at the repository root.

## Method 1: Update via GCP Console (Recommended)

### Step 1: Go to Cloud Build Triggers
1. Open: https://console.cloud.google.com/cloud-build/triggers
2. Find your trigger (likely named something like `manumaharani-client-deploy` or similar)
3. Click the **three dots** (⋮) → **Edit**

### Step 2: Update Build Configuration
1. Scroll to **"Build Configuration"** section
2. Ensure **"Cloud Build configuration file (yaml or json)"** is selected
3. Change **"Cloud Build configuration file location"** to:
   ```
   cloudbuild.client.yaml
   ```
   (Remove `apps/client/` from the path)

4. Click **"Save"**

### Step 3: Trigger a Build
1. Click **"Run"** on your trigger, OR
2. Push a new commit to your branch

## Method 2: Delete and Recreate Trigger via gcloud

```bash
# List existing triggers to find the name
gcloud builds triggers list

# Delete the old trigger (replace TRIGGER_NAME with actual name)
gcloud builds triggers delete TRIGGER_NAME

# Create new trigger with correct config
gcloud builds triggers create github \
  --name="manumaharani-client-deploy" \
  --repo-name="Manu-Maharani" \
  --repo-owner="rajivsuting" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.client.yaml" \
  --region="asia-south1"
```

## Method 3: Update via Cloud Run Console

### If you set up deployment directly from Cloud Run:

1. Go to: https://console.cloud.google.com/run
2. Click on your service: `manumaharani-client`
3. Click the **"Continuous Deployment"** tab (or **"Edit & Deploy New Revision"**)
4. Click **"Set up Cloud Build"** or **"Edit"**
5. In the **Build Configuration** section:
   - Select: **"Cloud Build configuration file (yaml or json)"**
   - Set location to: `cloudbuild.client.yaml`
6. Click **"Save"**

## Verify the Fix

After updating, trigger a new build:

```bash
# Option 1: Push an empty commit
git commit --allow-empty -m "Trigger build with updated config"
git push origin main

# Option 2: Manually trigger
gcloud builds submit \
  --config=cloudbuild.client.yaml \
  --substitutions=COMMIT_SHA=$(git rev-parse HEAD)
```

## Why This Works

```
Repository Structure:
Manu-Maharani/                    ← Cloud Build starts here
├── cloudbuild.client.yaml        ← ✅ Use this (at repo root)
├── yarn.lock                     ← ✅ Found!
├── package.json                  ← ✅ Found!
├── .yarnrc.yml                   ← ✅ Found!
└── apps/
    └── client/
        ├── cloudbuild.yaml       ← ❌ Don't use (in subdirectory)
        ├── Dockerfile
        └── src/
```

When `cloudbuild.client.yaml` is at the root:
- Build context = `.` (repository root)
- Dockerfile path = `apps/client/Dockerfile`
- All monorepo files are accessible ✅

## Expected Build Output

After the fix, you should see:
```
Step 5/34 : COPY package.json yarn.lock .yarnrc.yml ./
 ---> Using cache
 ---> abc123def456
Step 6/34 : COPY apps/client/package.json ./apps/client/
 ---> 789ghi012jkl
...
Successfully built and deployed!
```

## Need Help?

If you still see errors, check:
1. The trigger is using `cloudbuild.client.yaml` (not `apps/client/cloudbuild.yaml`)
2. The repository is connected correctly
3. The branch pattern matches your branch name (e.g., `main` or `master`)

