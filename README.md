# Helm + FluxCD GitOps Project

## Overview

This project demonstrates a complete end-to-end GitOps workflow using:

* React Application
* Docker
* DockerHub
* GitHub Actions
* Helm
* FluxCD
* Kubernetes (Minikube)
* NGINX Ingress

The purpose of this project is to understand modern DevOps deployment workflows using GitOps principles.

---

# Architecture

```text
Developer Push
      ↓
GitHub Actions CI
      ↓
Docker Image Build
      ↓
Push Image to DockerHub
      ↓
Update GitOps Repository
      ↓
FluxCD detects changes
      ↓
Helm Release upgraded automatically
      ↓
Kubernetes Rolling Update
      ↓
Application Updated
```

---

# Repositories Used

## Application Repository

Repository:

```text
helm-flux-react-app
```

Contains:

* React application source code
* Dockerfile
* GitHub Actions workflow
* CI pipeline

---

## GitOps Repository

Repository:

```text
helm-flux-gitops
```

Contains:

* Helm chart
* FluxCD manifests
* Kubernetes deployment configuration
* GitOps desired cluster state

---

# Why Separate Repositories?

This follows industry-standard GitOps architecture.

## App Repository Responsibility

Responsible for:

* application code
* unit testing
* Docker image creation
* CI pipeline

---

## GitOps Repository Responsibility

Responsible for:

* Kubernetes manifests
* Helm chart
* deployment state
* desired cluster configuration

---

# Technologies Used

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| React          | Frontend application       |
| Docker         | Containerization           |
| DockerHub      | Container registry         |
| GitHub Actions | CI automation              |
| Kubernetes     | Container orchestration    |
| Helm           | Kubernetes package manager |
| FluxCD         | GitOps controller          |
| Minikube       | Local Kubernetes cluster   |
| Ingress NGINX  | HTTP routing               |

---

# Project Folder Structure

## Local Workspace

```text
helm-flux-project/
│
├── helm-flux-react-app
└── helm-flux-gitops
```

---

# Application Repository Structure

```text
helm-flux-react-app/
│
├── .github/
│   └── workflows/
│       └── docker-build.yml
│
├── src/
├── public/
├── Dockerfile
├── .dockerignore
├── package.json
└── README.md
```

---

# GitOps Repository Structure

```text
helm-flux-gitops/
│
├── quote-app/
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   ├── configmap.yaml
│   │   ├── namespace.yaml
│   │   └── _helpers.tpl
│   │
│   ├── Chart.yaml
│   └── values.yaml
│
└── clusters/
    └── dev/
        ├── git-source.yaml
        ├── helm-release.yaml
        └── kustomization.yaml
```

---

# Kubernetes Concepts Used

## Namespace

Namespace used:

```text
helm-flux-demo
```

Purpose:

* logical isolation
* clean environment separation
* avoids conflicts

---

## Deployment

Deployment manages:

* pod replicas
* rolling updates
* self healing
* desired state reconciliation

Replica count:

```yaml
replicaCount: 2
```

---

## Service

Service provides:

* stable networking
* load balancing
* pod discovery

Type used:

```yaml
ClusterIP
```

---

## Ingress

Ingress exposes application externally.

Host used:

```text
quote-app.local
```

---

## ConfigMap

ConfigMap externalizes configuration.

Used for:

* environment variables
* application configuration

---

# Helm Concepts Used

## Helm Chart

Helm chart packages Kubernetes manifests together.

Files:

* Chart.yaml
* values.yaml
* templates/

---

## values.yaml

Centralized configuration file.

Contains:

* image repository
* image tag
* ingress config
* replica count
* resource limits

---

## Helm Templating

Example:

```yaml
image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
```

This dynamically injects values from:

```yaml
values.yaml
```

---

## Helm Helpers

Used:

```yaml
_helpers.tpl
```

Purpose:

* reusable naming
* template consistency
* reduced duplication

---

# FluxCD Concepts Used

## GitRepository

Flux resource that pulls Git repository.

Purpose:

* continuously monitor Git changes
* clone Git repository
* reconcile cluster state

---

## HelmRelease

Flux custom resource.

Purpose:

* declarative Helm deployment
* automated reconciliation
* automatic upgrades

---

## Reconciliation

Flux continuously compares:

* desired Git state
* actual cluster state

If drift occurs:

Flux automatically fixes it.

---

# GitOps Workflow

## CI Flow

```text
Code Push
    ↓
GitHub Actions
    ↓
Docker Build
    ↓
Push to DockerHub
```

---

## CD Flow

```text
GitOps Repository Update
      ↓
FluxCD detects changes
      ↓
Helm upgrade triggered
      ↓
Kubernetes rolling update
```

---

# GitHub Actions Workflow

Pipeline Responsibilities:

* build Docker image
* push image to DockerHub
* update GitOps repository
* commit updated image tag

---

# Why Immutable Image Tags?

Used:

```text
github.sha
```

Benefits:

* reproducible deployments
* easy rollback
* traceability
* auditability

Avoid using only:

```text
latest
```

in production systems.

---

# Docker Concepts Used

## Multi-Stage Build

Stage 1:

* build React application

Stage 2:

* serve static files via NGINX

Benefits:

* smaller image size
* faster deployment
* reduced attack surface

---

# Networking Flow

```text
Browser
   ↓
Ingress
   ↓
Service
   ↓
Pods
```

---

# Minikube Setup

Cluster started using:

```powershell
minikube start --driver=docker
```

Ingress enabled using:

```powershell
minikube addons enable ingress
```

Tunnel started using:

```powershell
minikube tunnel
```

---

# Hosts File Mapping

Windows hosts file:

```text
C:\Windows\System32\drivers\etc\hosts
```

Entry added:

```text
127.0.0.1 quote-app.local
```

---

# Important DevOps Concepts Learned

## Declarative Infrastructure

Desired state defined in YAML.

Kubernetes continuously reconciles actual state.

---

## Immutable Infrastructure

Containers are immutable deployment artifacts.

---

## GitOps

Git becomes the source of truth for deployments.

---

## Reconciliation Loop

FluxCD and Kubernetes continuously ensure:

```text
Actual State == Desired State
```

---

## Rolling Updates

Kubernetes updates pods gradually with zero downtime.

---

## Self Healing

If a pod crashes or is deleted:

Kubernetes recreates it automatically.

---

# Demo Scenarios

## 1. CI/CD Demo

Change application code.

Push changes.

Observe:

* GitHub Actions pipeline
* Docker image build
* DockerHub image update
* Flux deployment
* browser update

---

## 2. Rolling Update Demo

Change app version.

Observe:

```powershell
kubectl get pods -n helm-flux-demo -w
```

Pods update gradually.

---

## 3. Self-Healing Demo

Delete pod manually:

```powershell
kubectl delete pod <pod-name> -n helm-flux-demo
```

Observe:

Kubernetes recreates pod automatically.

---

## 4. Flux Reconciliation Demo

Modify Helm values in GitOps repository.

Push changes.

Observe:

Flux automatically syncs cluster.

---

# Useful Commands

## Kubernetes

```powershell
kubectl get pods -A
kubectl get svc -A
kubectl get ingress -A
kubectl get deployment -A
```

---

## Helm

```powershell
helm lint quote-app
helm template quote-app ./quote-app
helm list -A
```

---

## FluxCD

```powershell
flux get all
flux get sources git
flux get helmreleases
flux reconcile source git helm-flux-gitops
```

---

# Final Outcome

This project demonstrates:

* Dockerized frontend application
* CI automation
* GitOps workflow
* Helm templating
* FluxCD reconciliation
* Kubernetes deployment
* Ingress networking
* automated rolling updates
* self healing infrastructure

This is a strong portfolio-grade DevOps project suitable for:

* DevOps interviews
* Kubernetes demonstrations
* GitOps learning
* CI/CD learning
* cloud-native portfolio showcase

---

# Future Improvements

Possible enhancements:

* Prometheus monitoring
* Grafana dashboards
* Horizontal Pod Autoscaler
* Argo Rollouts
* Canary deployments
* TLS certificates
* External Secrets Operator
* Multi-environment GitOps
* Production Kubernetes cluster
