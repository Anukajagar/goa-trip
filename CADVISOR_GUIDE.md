# 🐳 cAdvisor Integration Guide - Container Monitoring

## Overview

**cAdvisor (Container Advisor)** has been added to your monitoring stack. It provides detailed container-level metrics for all your Docker containers.

## 🎯 What cAdvisor Monitors

Unlike the Node.js application metrics (which monitor the app itself), cAdvisor monitors:
- **Container CPU usage**
- **Container memory usage**
- **Network I/O**
- **Disk I/O**
- **Container resource limits**
- **Container lifecycle events**

## 📍 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **cAdvisor Web UI** | http://localhost:8080 | Visual container monitoring |
| **cAdvisor Metrics** | http://localhost:8080/metrics | Prometheus scraping endpoint |
| **Prometheus** | http://localhost:9090 | Query all metrics |
| **Grafana** | http://localhost:3000 | Visualize everything |

## 🔍 Working cAdvisor Queries

### CPU Metrics

**Container CPU Usage (the query you tried earlier!)**
```promql
rate(container_cpu_usage_seconds_total{name!=""}[5m])
```
*Shows CPU usage rate per container*

**CPU Usage by Container Name**
```promql
rate(container_cpu_usage_seconds_total{name="goa-trip-app"}[5m])
```
*Monitor specific container CPU*

**Total CPU Usage (All Containers)**
```promql
sum(rate(container_cpu_usage_seconds_total{name!=""}[5m]))
```

### Memory Metrics

**Container Memory Usage**
```promql
container_memory_usage_bytes{name!=""}
```
*Current memory usage per container*

**Container Memory Working Set**
```promql
container_memory_working_set_bytes{name!=""}
```
*More accurate than usage_bytes, excludes cache*

**Memory Usage for Specific Container**
```promql
container_memory_working_set_bytes{name="goa-trip-app"}
```

**Memory Usage Percentage**
```promql
(container_memory_working_set_bytes{name!=""} / container_spec_memory_limit_bytes{name!=""}) * 100
```

### Network Metrics

**Network Receive Rate**
```promql
rate(container_network_receive_bytes_total{name!=""}[5m])
```

**Network Transmit Rate**
```promql
rate(container_network_transmit_bytes_total{name!=""}[5m])
```

**Total Network I/O**
```promql
rate(container_network_receive_bytes_total{name="goa-trip-app"}[5m]) + rate(container_network_transmit_bytes_total{name="goa-trip-app"}[5m])
```

### Disk I/O Metrics

**Disk Read Rate**
```promql
rate(container_fs_reads_bytes_total{name!=""}[5m])
```

**Disk Write Rate**
```promql
rate(container_fs_writes_bytes_total{name!=""}[5m])
```

### Container Info

**Number of Running Containers**
```promql
count(container_last_seen{name!=""})
```

**Container Uptime**
```promql
time() - container_start_time_seconds{name!=""}
```

## 📊 Recommended Grafana Panels for cAdvisor

### Panel 1: Container CPU Usage
```promql
rate(container_cpu_usage_seconds_total{name!=""}[5m]) * 100
```
- **Panel Type**: Time Series
- **Unit**: Percent (0-100)
- **Legend**: {{name}}

### Panel 2: Container Memory Usage
```promql
container_memory_working_set_bytes{name!=""}
```
- **Panel Type**: Time Series
- **Unit**: Bytes
- **Legend**: {{name}}

### Panel 3: Network I/O Rate
```promql
rate(container_network_receive_bytes_total{name!=""}[5m])
```
- **Panel Type**: Time Series
- **Unit**: Bytes/sec
- **Legend**: {{name}} - RX

### Panel 4: Container Count
```promql
count(container_last_seen{name!=""})
```
- **Panel Type**: Stat
- **Unit**: Number

### Panel 5: Memory Percentage
```promql
(container_memory_working_set_bytes{name!=""} / container_spec_memory_limit_bytes{name!=""}) * 100
```
- **Panel Type**: Gauge
- **Unit**: Percent (0-100)
- **Thresholds**: Green (0-70), Yellow (70-85), Red (85-100)

## 🎨 Complete Dashboard Layout Suggestion

### Dashboard: "Container Metrics"

**Row 1: Overview**
- Container Count (Stat)
- Total CPU Usage (Gauge)
- Total Memory Usage (Gauge)

**Row 2: CPU Details**
- CPU Usage per Container (Time Series)
- CPU Usage Breakdown (Bar Gauge)

**Row 3: Memory Details**
- Memory Usage per Container (Time Series)
- Memory Percentage (Gauge)

**Row 4: Network & Disk**
- Network RX/TX (Time Series)
- Disk Read/Write (Time Series)

## 🔧 How to Use in Grafana

1. **Open Grafana**: http://localhost:3000
2. **Create New Dashboard** or edit existing one
3. **Add Panel** → Select "Prometheus"
4. **Switch to Code mode**
5. **Paste any query from above**
6. **Run queries** to see the data
7. **Customize** panel title, colors, thresholds
8. **Save** your dashboard

## 🆚 Comparison: Node.js Metrics vs cAdvisor

| Feature | Node.js Metrics | cAdvisor |
|---------|----------------|----------|
| **Scope** | Single application | All containers |
| **Granularity** | Process-level | Container-level |
| **CPU** | Process CPU time | Container CPU usage |
| **Memory** | Heap, RSS | Container memory limits |
| **Network** | ❌ Not available | ✅ Per container |
| **Disk** | ❌ Not available | ✅ Per container |
| **Event Loop** | ✅ Yes | ❌ No |
| **Best For** | App performance | Infrastructure monitoring |

## 💡 Pro Tips

### Filter by Container Name
Add `{name="goa-trip-app"}` to any query to focus on your application container:
```promql
container_memory_usage_bytes{name="goa-trip-app"}
```

### Exclude Empty Containers
Use `{name!=""}` to exclude system containers:
```promql
container_cpu_usage_seconds_total{name!=""}
```

### Combine Metrics
You can use both Node.js and cAdvisor metrics in the same dashboard!

**Example: Memory Comparison**
- Application heap: `nodejs_heap_size_used_bytes`
- Container total: `container_memory_working_set_bytes{name="goa-trip-app"}`

## 🚀 Advanced Queries

### CPU Usage Top 5 Containers
```promql
topk(5, rate(container_cpu_usage_seconds_total{name!=""}[5m]))
```

### Memory Usage Sorted
```promql
sort_desc(container_memory_working_set_bytes{name!=""})
```

### Network Bandwidth Usage
```promql
sum by (name) (
  rate(container_network_transmit_bytes_total{name!=""}[5m]) +
  rate(container_network_receive_bytes_total{name!=""}[5m])
)
```

### Containers Using >70% Memory
```promql
(container_memory_working_set_bytes / container_spec_memory_limit_bytes) > 0.7
```

## 📈 Sample Alert Rules

### High CPU Alert
```promql
rate(container_cpu_usage_seconds_total{name="goa-trip-app"}[5m]) * 100 > 80
```
*Alert when app container uses >80% CPU*

### High Memory Alert
```promql
(container_memory_working_set_bytes{name="goa-trip-app"} / container_spec_memory_limit_bytes{name="goa-trip-app"}) * 100 > 85
```
*Alert when app container uses >85% memory*

### Container Down
```promql
absent(container_last_seen{name="goa-trip-app"})
```
*Alert when app container is not running*

## 🐛 Troubleshooting

### cAdvisor Not Starting
- Check if running: `docker ps | findstr cadvisor`
- View logs: `docker logs goa-trip-cadvisor`

### No Metrics in Prometheus
- Verify cAdvisor endpoint: http://localhost:8080/metrics
- Check Prometheus targets: http://localhost:9090/targets
- Ensure Prometheus restarted after config change

### Permission Errors (Windows)
cAdvisor requires access to Docker socket. If you see errors:
- Ensure Docker Desktop is running
- Check that volumes are properly mounted
- May need WSL2 backend enabled

## 🎉 What You Can Now Monitor

With cAdvisor + Node.js metrics + Prometheus + Grafana, you have:

✅ **Application-level metrics** (via prom-client)
- Event loop lag
- Heap usage
- Process CPU/memory

✅ **Container-level metrics** (via cAdvisor)
- Container CPU/memory
- Network I/O
- Disk I/O

✅ **Complete observability** of your entire stack!

## 🔗 Quick Links

- **cAdvisor UI**: http://localhost:8080
- **cAdvisor Docs**: https://github.com/google/cadvisor
- **Prometheus Queries**: http://localhost:9090/graph
- **Grafana Dashboards**: http://localhost:3000

---

**Next Steps:**
1. Access http://localhost:8080 to see cAdvisor's built-in UI
2. Try the queries in Prometheus
3. Create new Grafana panels with container metrics
4. Combine app metrics + container metrics for complete visibility!
