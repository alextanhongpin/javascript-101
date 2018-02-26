# Heartbeat Pattern

The heartbeat pattern is used to monitor long running processes (worker) so that the client know that the process is still alive.

```javascript
class Heartbeat {
  constructor () {
    this.beats = 0
    this.start = Date.now()
    this.end = null
    this.lastTimestamp = this.start
    this.heartbeat_interval = 2000
  }
  checkPulse () {
    if (Date.now() - this.lastTimestamp > this.heartbeat_interval) {
      this.end = Date.now()
      this.lastTimestamp = this.end
      this.beats += 1
      console.log('ping!', new Date(this.lastTimestamp))
    }
  }
  duration () {
    return (this.end - this.start) / 1000
  }
  info () {
    // TODO: Prettify date
    return {
      beats: this.beats, 
      start: new Date(this.start), 
      end: new Date(this.end), 
      duration: this.duration() + 's'
    }
  }
}

let counter = 0
let isWorking = false
const beat = new Heartbeat()

function loop () {
  beat.checkPulse()

  // Perform asynchronous task here
  setTimeout(() => {
    isWorking = false
  }, 10)

  counter++
  console.log(counter)
  return counter
}

const interval = setInterval(() => {
  if (isWorking) return
  const isTerminationCondition = loop() === 100
  if (isTerminationCondition) {
    clearInterval(interval)
    console.log(beat.info())
  }
}, 100)
```

Output:

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
ping! 2018-02-26T17:47:30.812Z
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
ping! 2018-02-26T17:47:32.875Z
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
ping! 2018-02-26T17:47:34.951Z
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
ping! 2018-02-26T17:47:37.025Z
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
ping! 2018-02-26T17:47:39.098Z
99
100
{ beats: 5,
  start: 2018-02-26T17:47:28.745Z,
  end: 2018-02-26T17:47:39.098Z,
  duration: '10.353s' }
```
