# QR-V™ Network Status

Public uptime, dependency health, incident communication, and service-status contract for the QR-V™ Global Verification Network.

## Canonical Public Status Page

Current consolidated route:

```text
https://qrv.network/status
```

Reserved dedicated monitoring service:

```text
https://status.qrv.network
```

The root route remains canonical until the dedicated service is deployed and validated.

## Monitored Services

| Service | Required health | Required readiness |
|---|---|---|
| Root network | `https://qrv.network/healthz` | `https://qrv.network/readyz` |
| Verification | `https://verify.qrv.network/healthz` | `https://verify.qrv.network/readyz` |
| API | `https://api.qrv.network/healthz` | `https://api.qrv.network/readyz` |
| Registry | `https://registry.qrv.network/healthz` | `https://registry.qrv.network/readyz` |
| Issuer portal | `https://issuer.qrv.network/healthz` | `https://issuer.qrv.network/readyz` |

Optional services:

- `explorer.qrv.network`
- `docs.qrv.network`
- `developers.qrv.network`
- `admin.qrv.network`
- `wallet.qrv.network`
- billing and webhook services

## Public Status Categories

```text
OPERATIONAL
DEGRADED
RATE_LIMITED
PARTIAL_OUTAGE
MAJOR_OUTAGE
MAINTENANCE
RESERVED
UNKNOWN
```

## Status Calculation

- `OPERATIONAL`: health and readiness pass within the defined latency threshold.
- `DEGRADED`: service responds but readiness, dependency, or latency checks are impaired.
- `RATE_LIMITED`: service is intentionally limiting requests but remains available.
- `PARTIAL_OUTAGE`: a material feature or dependency is unavailable.
- `MAJOR_OUTAGE`: the primary service is unreachable or cannot perform its core function.
- `MAINTENANCE`: an announced maintenance window is active.
- `RESERVED`: DNS or repository exists, but the service is not yet publicly launched.
- `UNKNOWN`: monitoring cannot determine a reliable state.

Never label a service operational solely because its homepage returns HTTP 200. Readiness must confirm required dependencies.

## Required Dashboard Features

1. Overall network status.
2. Service cards with status, latency, version, and last checked time.
3. Dependency-aware readiness results.
4. Incident history and public updates.
5. Maintenance windows.
6. Thirty-day and ninety-day uptime summaries.
7. JSON status endpoint.
8. No secrets, private logs, stack traces, or admin controls.
9. Safe handling of monitor failure without falsely reporting operational status.

## JSON Status Contract

```json
{
  "network": "QR-V Global Verification Network",
  "status": "OPERATIONAL",
  "checkedAt": "2026-08-01T04:29:00Z",
  "services": [
    {
      "id": "verify",
      "name": "Public Verification",
      "url": "https://verify.qrv.network",
      "status": "OPERATIONAL",
      "latencyMs": 143,
      "version": "1.0.0"
    }
  ]
}
```

## Incident Severity

- **SEV-1:** incorrect verification state, unauthorized issuance/revocation, key compromise, or registry corruption.
- **SEV-2:** verification, API, registry, or issuer service materially unavailable.
- **SEV-3:** explorer, documentation, analytics, or non-critical function degraded.
- **SEV-4:** cosmetic or low-impact issue.

## Production Requirement

The status system must monitor the canonical demo lifecycle without publishing a false `VERIFIED` result. The verifier, API, and registry must agree on `QRV-PROD-CERT-000001`; disagreement is at least `DEGRADED` and may be a SEV-1 incident if user-facing results are incorrect.

See `services.json` for the machine-readable monitoring inventory.
