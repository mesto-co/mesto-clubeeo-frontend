<template>
  <q-card dark class="dialog-width">
    <q-card-section>
      <p>
        javascript function transforms data provided by event and other sources
      </p>
      <p>
        data is accessible via injected constants (e.g.
        <code>event</code>)<br />
        the last line is a return of a function, you don't need to use
        <code>return</code> keyword itself<br />
        in case this function returns <code>null</code> the trigger is rejected
        and doesn't create a task to process
      </p>
      <ul>
        <li>
          <code>event</code> &mdash; object with event data. each event type has
          it's own set of properties
        </li>
      </ul>

      <pre v-highlightjs><code class="javascript bg-transparent">
// function example

// initialize result value
let result;

if (!event.message) {
  // null is rejection
  result = null
} else {
  // preparing data to be provided to a task
  // set of properties varies depending on a task type
  result = {
    text: `${event.message}!!!`,
    member: event.member,
  }
}

// return value
result;

/*
example

event data:
  {
    "message": "hello there",
    "memberId": 1
  }

output:
  {
    "text": "hello there!!!",
    "memberId": 1
  }
*/
       </code></pre>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'highlight.js/styles/solarized-light.css';

export default defineComponent({
  components: {},
});
</script>
