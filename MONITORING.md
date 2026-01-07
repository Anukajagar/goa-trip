# Prometheus and Grafana Monitoring Setup for Goa Holiday Packages

This document explains the monitoring implementation using Prometheus and Grafana.

## Overview

Your application now has a complete monitoring stack with:
- **Prometheus**: Collects and stores metrics from your Node.js application
- **Grafana**: Visualizes the metrics in beautiful dashboards

## Architecture

```
┌─────────────┐      ┌────────────────┐      ┌─────────┐
│   Your App  │ ───▶ │   Prometheus   │ ───▶ │ Grafana │
│  (Port 8000)│      │   (Port 9090)  │      │ (Port   │
│             │      │                │      │  3000)  │
└─────────────┘      └────────────────┘      └─────────┘
     │
     │ Exposes /metrics endpoint
     │
     ▼
  Metrics Data
```

## How It Works

### 1. **Application Metrics Endpoint** (`/metrics`)
Your Node.js backend now exposes a `/metrics` endpoint that Prometheus scrapes every 15 seconds. This endpoint provides:
- HTTP request rates
- Response times
- CPU usage
- Memory consumption
- Event loop lag
- Active handles
- Heap usage

### 2. **Prometheus Configuration** (`prometheus.yml`)
Prometheus is configured to:
- Scrape metrics from your app every 15 seconds
- Store time-series data
- Make data queryable via PromQL

### 3. **Grafana Dashboard** 
Grafana connects to Prometheus and displays:
- **HTTP Request Rate**: Track incoming requests
- **Response Time**: Monitor API performance
- **CPU Usage**: See processor utilization
- **Memory Usage**: Track memory consumption
- **Event Loop Lag**: Node.js-specific performance metric
- **Active Handles**: Monitor open connections
- **Heap Usage**: JavaScript memory management

## Accessing the Monitoring Stack

Once you run `docker compose up --build`, you can access:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Your Application** | http://localhost:8000 | N/A |
| **Prometheus** | http://localhost:9090 | N/A |
| **Grafana** | http://localhost:3000 | Username: `admin`<br>Password: `admin` |

## Step-by-Step Usage Guide

### Step 1: Start the Stack
```powershell
docker compose up --build
```

### Step 2: View Raw Metrics
Open your browser to http://localhost:8000/metrics to see the raw Prometheus metrics format.

### Step 3: Query Metrics in Prometheus
1. Open http://localhost:9090
2. Try queries like:
   - `process_cpu_user_seconds_total` - See CPU usage
   - `nodejs_heap_size_used_bytes` - Check memory usage
   - `up{job="goa-trip-app"}` - Verify app is being scraped

### Step 4: View Dashboards in Grafana
1. Open http://localhost:3000
2. Login with:
   - Username: `admin`
   - Password: `admin`
3. Click **Dashboards** → **Browse**
4. You should see "Goa Holiday Packages - Application Metrics"

### Step 5: Create Custom Dashboards
1. In Grafana, click **+ Create** → **Dashboard**
2. Add a panel
3. Select "Prometheus" as the data source
4. Use PromQL to query metrics

## Key Metrics to Monitor

| Metric | What It Tells You | When to Worry |
|--------|-------------------|---------------|
| **HTTP Request Rate** | How many requests/sec | Sudden spike or drop |
| **Response Time** | API performance | Consistently > 1 second |
| **CPU Usage** | Processor load | Constantly > 70% |
| **Memory Usage** | RAM consumption | Continuously growing (memory leak) |
| **Event Loop Lag** | Node.js responsiveness | > 100ms |

## Troubleshooting

### Prometheus Can't Scrape App
1. Check if app is running: `docker ps`
2. Verify metrics endpoint: http://localhost:8000/metrics
3. Check Prometheus targets: http://localhost:9090/targets

### Grafana Shows No Data
1. Verify Prometheus is running
2. Check datasource connection in Grafana settings
3. Ensure time range is correct (default: Last 6 hours)

### Custom Dashboard Not Showing
The dashboard in `grafana-dashboard.json` is a template. To import it:
1. In Grafana, go to **Dashboards** → **Import**
2. Upload `grafana-dashboard.json`
3. Select "Prometheus" as the datasource

## Production Considerations

For production deployment, you should:
1. **Change Grafana Password**: Set a strong password via environment variables
2. **Enable Authentication**: Configure proper user management
3. **Set Up Alerts**: Create alert rules in Grafana for critical metrics
4. **Configure Retention**: Adjust Prometheus data retention based on storage
5. **Use HTTPS**: Set up reverse proxy with SSL certificates

## File Structure

```
Trip to goa/
├── prometheus.yml              # Prometheus scrape configuration
├── grafana-datasource.yml      # Grafana datasource (Prometheus)
├── grafana-dashboard.json      # Pre-built dashboard template
├── docker-compose.yml          # Updated with monitoring services
└── server/index.js             # Updated with /metrics endpoint
```

## Next Steps

1. **Generate Load**: Use your application to generate metrics
2. **Explore Queries**: Learn PromQL to create custom queries
3. **Set Up Alerts**: Configure Grafana alerts for critical thresholds
4. **Monitor Trends**: Use dashboards to identify performance patterns

## Useful PromQL Queries

```promql
# Average response time over 5 minutes
rate(http_request_duration_ms_sum[5m]) / rate(http_request_duration_ms_count[5m])

# Request rate by endpoint
rate(http_requests_total[1m])

# 95th percentile response time
histogram_quantile(0.95, rate(http_request_duration_ms_bucket[5m]))

# Memory growth rate
rate(nodejs_heap_size_used_bytes[5m])
```

## Benefits of This Setup

✅ **Real-time Monitoring**: See what's happening right now  
✅ **Historical Analysis**: Track trends over time  
✅ **Performance Optimization**: Identify bottlenecks  
✅ **Proactive Alerting**: Get notified before users complain  
✅ **Capacity Planning**: Understand resource requirements  
✅ **Debugging**: Correlate issues with metrics  

---

**Questions?** The monitoring stack is containerized and will start/stop with your application automatically.
