# Heartbeat Pattern

The heartbeat pattern is used to monitor long running processes (worker) so that the client know that the process is still alive.

```javascript
// heartbeat.js

class Heartbeat {
  constructor () {
    this.statusEnum = {
      IDLE: 'IDLE',
      IDLE_THRESHOLD_EXCEEDED: 'IDLE_THRESHOLD_EXCEEDED',
      RUNNING: 'RUNNING',
      WARNING: 'WARNING',
      ERROR_THRESHOLD_EXCEEDED: 'ERROR_THRESHOLD_EXCEEDED'
    }

    this.status = this.statusEnum.IDLE
    this.beatCount = 0
    this.errorCount = 0
    this.idleCount = 0

    this.start = Date.now()
    this.end = null
    this.lastTimestamp = this.start

    this.heartbeatIntervalInMilliseconds = 2000
    this.errorThreshold = 30
    this.idleThreshold = 30
  }

  incrementBeat () {
    this.beatCount += 1
    this.idleCount = 0
  }

  incrementError () {
    this.errorCount += 1
  }

  incrementIdle () {
    this.idleCount += 1
  }

  getStatus () {
    // Ordered from importance (top - less important, bottom - more important)
    this.status = this.statusEnum.RUNNING

    if (this.errorCount > 0) {
      this.status = this.errorCount > this.errorThreshold
                  ? this.statusEnum.ERROR_THRESHOLD_EXCEEDED
                  : this.statusEnum.WARNING
    }

    if (this.idleCount > 0) {
      this.status = this.idleCount > this.idleThreshold
                ? this.statusEnum.IDLE_THRESHOLD_EXCEEDED
                : this.statusEnum.IDLE
    }
  }

  resetBeat () {
    this.beatCount = 0
  }

  resetError () {
    this.errorCount = 0
  }

  resetIdle () {
    this.idleCount = 0
  }

  emitPulse () {
    const formattedDate = this.formatDate(this.lastTimestamp)
    console.log(`[${formattedDate}] errorCount = ${this.errorCount}, idleCount = ${this.idleCount}, beatCount = ${this.beatCount} status = ${this.status}`)
  }

  checkPulse () {
    const interval = Date.now() - this.lastTimestamp
    if (interval > this.heartbeatIntervalInMilliseconds) {
      this.end = Date.now()
      this.lastTimestamp = this.end
      this.getStatus()
      this.emitPulse()
    }
  }

  duration () {
    return (this.end - this.start) / 1000
  }

  paddZero (n) {
    return n < 10 ? `0${n}` : n
  }

  formatDate (timestamp) {
    const dateObject = new Date(timestamp)
    const year = dateObject.getFullYear()
    const month = this.paddZero(dateObject.getMonth() + 1)
    const date = this.paddZero(dateObject.getDate() + 1)
    const hour = this.paddZero(dateObject.getHours())
    const minute = this.paddZero(dateObject.getMinutes())

    return `${year}-${month}-${date} ${hour}:${minute}`
  }

  info () {
    return {
      beatCount: this.beatCount,
      errorCount: this.errorCount,
      idleCount: this.idleCount,
      start: new Date(this.start),
      end: new Date(this.end),
      durationInSeconds: this.duration()
    }
  }
}

function main () {
  const MAX_COUNTER = 300
  let counter = 0
  let isWorking = false
  const beat = new Heartbeat()

  function loop () {
  // Perform asynchronous task here
    setTimeout(() => {
      // Assume the job is done close to the end
      if (counter > MAX_COUNTER * 0.8) {
        beat.incrementIdle()
      } else {
        // Assume errors occurred at times
        if (Math.random() < 0.1) {
          beat.incrementError()
        } else {
          // Everything is working fine, add a beat
          beat.incrementBeat()
        }
      }
      isWorking = false
    }, 10)

    beat.checkPulse()

    counter++
    console.log(counter)
    return counter
  }

  const interval = setInterval(() => {
    if (isWorking) return
    const isTerminationCondition = loop() === MAX_COUNTER
    if (isTerminationCondition) {
      clearInterval(interval)
      console.log(beat.info())
    }
  }, 100)
}

main()
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
19
[2018-02-28 23:19] errorCount = 0, idleCount = 0, beatCount = 19 status = RUNNING
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
39
[2018-02-28 23:19] errorCount = 1, idleCount = 0, beatCount = 38 status = WARNING
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
59
[2018-02-28 23:19] errorCount = 3, idleCount = 0, beatCount = 56 status = WARNING
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
79
[2018-02-28 23:19] errorCount = 4, idleCount = 0, beatCount = 75 status = WARNING
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
99
[2018-02-28 23:19] errorCount = 6, idleCount = 0, beatCount = 93 status = WARNING
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
[2018-02-28 23:19] errorCount = 8, idleCount = 0, beatCount = 111 status = WARNING
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
[2018-02-28 23:19] errorCount = 11, idleCount = 0, beatCount = 128 status = WARNING
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
[2018-02-28 23:19] errorCount = 15, idleCount = 0, beatCount = 144 status = WARNING
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
[2018-02-28 23:19] errorCount = 17, idleCount = 0, beatCount = 162 status = WARNING
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
[2018-02-28 23:19] errorCount = 21, idleCount = 0, beatCount = 178 status = WARNING
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
[2018-02-28 23:19] errorCount = 22, idleCount = 0, beatCount = 197 status = WARNING
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
[2018-02-28 23:19] errorCount = 24, idleCount = 0, beatCount = 215 status = WARNING
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
[2018-02-28 23:19] errorCount = 24, idleCount = 19, beatCount = 216 status = IDLE
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
[2018-02-28 23:19] errorCount = 24, idleCount = 39, beatCount = 216 status = IDLE_THRESHOLD_EXCEEDED
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
[2018-02-28 23:19] errorCount = 24, idleCount = 59, beatCount = 216 status = IDLE_THRESHOLD_EXCEEDED
300
{ beatCount: 216,
  errorCount: 24,
  idleCount: 59,
  start: 2018-02-27T15:19:15.488Z,
  end: 2018-02-27T15:19:46.322Z,
  durationInSeconds: 30.834 }
```
