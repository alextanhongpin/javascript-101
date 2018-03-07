# Benchmark aero vs express vs native (hello world)


## Aero

```bash
$ ab -c 10 -n 5000 -k http://localhost:4000/hello
```

Output:

```
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 500 requests
Completed 1000 requests
Completed 1500 requests
Completed 2000 requests
Completed 2500 requests
Completed 3000 requests
Completed 3500 requests
Completed 4000 requests
Completed 4500 requests
Completed 5000 requests
Finished 5000 requests


Server Software:
Server Hostname:        localhost
Server Port:            4000

Document Path:          /hello
Document Length:        25 bytes

Concurrency Level:      10
Time taken for tests:   1.050 seconds
Complete requests:      5000
Failed requests:        0
Keep-Alive requests:    0
Total transferred:      735000 bytes
HTML transferred:       125000 bytes
Requests per second:    4763.92 [#/sec] (mean)
Time per request:       2.099 [ms] (mean)
Time per request:       0.210 [ms] (mean, across all concurrent requests)
Transfer rate:          683.88 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       2
Processing:     1    2   0.7      2       8
Waiting:        0    2   0.7      2       8
Total:          1    2   0.7      2       8

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      2
  75%      2
  80%      2
  90%      3
  95%      3
  98%      4
  99%      5
 100%      8 (longest request)
```

## Express

```bash
$ ab -c 10 -n 5000 -k http://localhost:3000/
```

Output:

```
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 500 requests
Completed 1000 requests
Completed 1500 requests
Completed 2000 requests
Completed 2500 requests
Completed 3000 requests
Completed 3500 requests
Completed 4000 requests
Completed 4500 requests
Completed 5000 requests
Finished 5000 requests


Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        25 bytes

Concurrency Level:      10
Time taken for tests:   1.053 seconds
Complete requests:      5000
Failed requests:        0
Keep-Alive requests:    5000
Total transferred:      1185000 bytes
HTML transferred:       125000 bytes
Requests per second:    4746.88 [#/sec] (mean)
Time per request:       2.107 [ms] (mean)
Time per request:       0.211 [ms] (mean, across all concurrent requests)
Transfer rate:          1098.64 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       1
Processing:     1    2   1.2      2      21
Waiting:        1    2   1.2      2      21
Total:          1    2   1.2      2      21

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      2
  75%      3
  80%      3
  90%      3
  95%      4
  98%      4
  99%      5
 100%     21 (longest request)
```

## Native http

```bash
$ ab -c 10 -n 5000 -k http://localhost:3000/
```

Output:


```
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 500 requests
Completed 1000 requests
Completed 1500 requests
Completed 2000 requests
Completed 2500 requests
Completed 3000 requests
Completed 3500 requests
Completed 4000 requests
Completed 4500 requests
Completed 5000 requests
Finished 5000 requests


Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        25 bytes

Concurrency Level:      10
Time taken for tests:   1.045 seconds
Complete requests:      5000
Failed requests:        0
Keep-Alive requests:    0
Total transferred:      660000 bytes
HTML transferred:       125000 bytes
Requests per second:    4784.47 [#/sec] (mean)
Time per request:       2.090 [ms] (mean)
Time per request:       0.209 [ms] (mean, across all concurrent requests)
Transfer rate:          616.75 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       6
Processing:     0    2   0.8      2       8
Waiting:        0    2   0.8      2       8
Total:          1    2   0.8      2       8

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      2
  75%      2
  80%      3
  90%      3
  95%      3
  98%      4
  99%      5
 100%      8 (longest request)
```

# Benchmark with large payload

## Aero


```
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 500 requests
Completed 1000 requests
Completed 1500 requests
Completed 2000 requests
Completed 2500 requests
Completed 3000 requests
Completed 3500 requests
Completed 4000 requests
Completed 4500 requests
Completed 5000 requests
Finished 5000 requests


Server Software:
Server Hostname:        localhost
Server Port:            4000

Document Path:          /hello
Document Length:        1198 bytes

Concurrency Level:      10
Time taken for tests:   1.418 seconds
Complete requests:      5000
Failed requests:        0
Keep-Alive requests:    0
Total transferred:      6600000 bytes
HTML transferred:       5990000 bytes
Requests per second:    3526.51 [#/sec] (mean)
Time per request:       2.836 [ms] (mean)
Time per request:       0.284 [ms] (mean, across all concurrent requests)
Transfer rate:          4545.89 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.5      0     104
Processing:     1    3   4.5      2     106
Waiting:        0    3   4.5      2     106
Total:          1    3   4.7      2     106

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      3
  75%      3
  80%      3
  90%      4
  95%      4
  98%      5
  99%      6
 100%    106 (longest request)
```


## Express

```
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 500 requests
Completed 1000 requests
Completed 1500 requests
Completed 2000 requests
Completed 2500 requests
Completed 3000 requests
Completed 3500 requests
Completed 4000 requests
Completed 4500 requests
Completed 5000 requests
Finished 5000 requests


Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        1198 bytes

Concurrency Level:      10
Time taken for tests:   0.704 seconds
Complete requests:      5000
Failed requests:        0
Keep-Alive requests:    5000
Total transferred:      7065000 bytes
HTML transferred:       5990000 bytes
Requests per second:    7107.06 [#/sec] (mean)
Time per request:       1.407 [ms] (mean)
Time per request:       0.141 [ms] (mean, across all concurrent requests)
Transfer rate:          9806.91 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       1
Processing:     0    1   0.5      1       5
Waiting:        0    1   0.5      1       5
Total:          0    1   0.5      1       5

Percentage of the requests served within a certain time (ms)
  50%      1
  66%      1
  75%      1
  80%      2
  90%      2
  95%      3
  98%      3
  99%      3
 100%      5 (longest request)
```

## Native http

```
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 500 requests
Completed 1000 requests
Completed 1500 requests
Completed 2000 requests
Completed 2500 requests
Completed 3000 requests
Completed 3500 requests
Completed 4000 requests
Completed 4500 requests
Completed 5000 requests
Finished 5000 requests


Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        1198 bytes

Concurrency Level:      10
Time taken for tests:   1.244 seconds
Complete requests:      5000
Failed requests:        0
Keep-Alive requests:    0
Total transferred:      6525000 bytes
HTML transferred:       5990000 bytes
Requests per second:    4018.80 [#/sec] (mean)
Time per request:       2.488 [ms] (mean)
Time per request:       0.249 [ms] (mean, across all concurrent requests)
Transfer rate:          5121.62 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0      22
Processing:     0    2   1.5      2      24
Waiting:        0    2   1.5      2      24
Total:          1    2   1.5      2      24

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      2
  75%      3
  80%      3
  90%      4
  95%      4
  98%      5
  99%      6
 100%     24 (longest request)
```