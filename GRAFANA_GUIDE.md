# 📊 Grafana Dashboard Guide - Goa Holiday Packages

## ✅ What's Working Now

You have successfully created your first Grafana panel showing **Memory Usage** with live data from your Node.js application!

## 🎯 Working Queries for Your Application

Here are all the Prometheus queries that work with your current setup. Use these to create more panels:

### 1️⃣ **Memory Metrics**

**Resident Memory (Main Process)**
```promql
process_resident_memory_bytes
```
*What it shows:* Total memory used by your Node.js process (currently ~70-75 MB)

**Heap Memory Used**
```promql
nodejs_heap_size_used_bytes
```
*What it shows:* JavaScript heap memory usage

**Heap Memory Total**
```promql
nodejs_heap_size_total_bytes
```
*What it shows:* Total allocated heap space

### 2️⃣ **CPU Metrics**

**CPU Time**
```promql
process_cpu_user_seconds_total
```
*What it shows:* Cumulative CPU time used

**CPU Usage Rate (More useful)**
```promql
rate(process_cpu_user_seconds_total[1m])
```
*What it shows:* CPU usage over the last minute

### 3️⃣ **Node.js Specific Metrics**

**Event Loop Lag**
```promql
nodejs_eventloop_lag_seconds
```
*What it shows:* How delayed the event loop is (higher = slower app)

**Active Handles**
```promql
nodejs_active_handles_total
```
*What it shows:* Number of active handles (connections, timers, etc.)

**Active Requests**
```promql
nodejs_active_requests_total
```
*What it shows:* Number of pending async requests

### 4️⃣ **System Metrics**

**Process Uptime**
```promql
process_uptime_seconds
```
*What it shows:* How long your app has been running

**Open File Descriptors**
```promql
process_open_fds
```
*What it shows:* Number of open files/connections

---

## 🔨 How to Add More Panels

### Method 1: Add Panel to Current Dashboard

1. Click **"Back to dashboard"** button (top left)
2. Click **"Add"** → **"Visualization"**
3. Select **"Prometheus"** as data source
4. Switch to **"Code"** mode
5. Enter one of the queries above
6. Click **"Run queries"**
7. Set the panel title in the right sidebar
8. Click **"Apply"**

### Method 2: Import Pre-made Dashboard

1. Download the `grafana-dashboard-working.json` file I created
2. In Grafana, click **"Dashboards"** → **"Import"**
3. Upload the JSON file
4. Select **"Prometheus"** as data source
5. Click **"Import"**

---

## 📈 Recommended Dashboard Layout

Here's a suggested setup for monitoring your app:

### Row 1 - Quick Stats (3 panels)
- **Memory Usage** (process_resident_memory_bytes) - ✅ Already created!
- **CPU Usage** (rate(process_cpu_user_seconds_total[1m]))
- **Active Handles** (nodejs_active_handles_total)

### Row 2 - Performance Graphs (2 panels)
- **Heap Memory Over Time** (nodejs_heap_size_used_bytes and nodejs_heap_size_total_bytes)
- **Event Loop Lag** (nodejs_eventloop_lag_seconds)

### Row 3 - System Info (2 panels)
- **Uptime** (process_uptime_seconds)
- **Open Files** (process_open_fds)

---

## 🎨 Panel Types Guide

### **Stat Panel** (Single Number)
Best for: Current values like memory usage, CPU %, uptime
- Shows latest value in big numbers
- Good for quick glances

### **Time Series** (Line Graph)
Best for: Tracking changes over time
- Shows trends and patterns
- What you're currently using for Memory Usage

### **Gauge**
Best for: Percentage-based metrics
- Visual representation with colors
- Good for CPU usage, memory percentage

---

## 💡 Quick Tips

### Color Thresholds
Set thresholds to change colors based on values:
1. In panel editor, go to **"Thresholds"** on the right
2. Add steps:
   - Green: 0-50 MB (healthy)
   - Yellow: 50-100 MB (warning)
   - Red: 100+ MB (critical)

### Auto-Refresh
Your dashboard already refreshes every 5 seconds (see top right: "Refresh: 5s")

### Time Range
Currently set to "Last 5 minutes" - you can change this in the top right to:
- Last 15 minutes
- Last 1 hour
- Last 6 hours
- Custom range

---

## 🚀 Next Steps

### Step 1: Save Your Current Dashboard
1. Click **"Save dashboard"** (top right, disk icon)
2. Give it a name: "Goa Holiday Packages - Real-time Monitoring"
3. Click **"Save"**

### Step 2: Add More Panels
Try adding these next:
- CPU Usage Rate: `rate(process_cpu_user_seconds_total[1m])`
- Event Loop Lag: `nodejs_eventloop_lag_seconds`

### Step 3: Arrange Your Layout
- Drag panels to reorganize
- Resize by dragging corners
- Group related metrics together

---

## 🐛 Troubleshooting

### No Data Showing
✅ **You don't have this problem!** Your graph is working perfectly.

### Query Returns No Results
- Check if your app container is running: `docker ps`
- Verify metrics endpoint: http://localhost:8000/metrics
- Check Prometheus targets: http://localhost:9090/targets

### Graph Shows Flat Line
- Generate some traffic to your app
- Adjust time range to see historical data

---

## 📊 Advanced Queries

### Memory Growth Rate
```promql
rate(process_resident_memory_bytes[5m])
```
Shows if memory is growing (potential memory leak)

### CPU Percentage
```promql
rate(process_cpu_user_seconds_total[1m]) * 100
```
CPU usage as a percentage

### Heap Utilization %
```promql
(nodejs_heap_size_used_bytes / nodejs_heap_size_total_bytes) * 100
```
How much of allocated heap is being used

---

## 🎉 You're Now Monitoring Your App!

Your Grafana setup is working perfectly. You're collecting real-time metrics from your Node.js application and visualizing them beautifully.

**Current Status:**
- ✅ Prometheus collecting metrics every 15 seconds
- ✅ Grafana connected to Prometheus
- ✅ First panel created with live data
- ✅ Graph showing real-time memory usage

Keep adding more panels to build a comprehensive monitoring dashboard!
