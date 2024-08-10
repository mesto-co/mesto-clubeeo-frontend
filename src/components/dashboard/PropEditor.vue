<template>
  <c-select
    v-if="prop.editor && prop.editor.type === 'select'"
    :show-image="prop.editor.showImage"
    :label="prop.label"
    :hint="prop.description"
    :options="prop.values"
    map-options
    v-model="model"
  />

  <copy-input
    v-else-if="prop.editor && prop.editor.type === 'copy'"
    :label="prop.label"
    :model-value="prop.view"
    :hint="prop.description"
    filled
    dark
    :disable="!prop.editable"
    :copy-value="prop.view"
  />

  <template v-else-if="prop.editor && prop.editor.type === 'rich-edit'">
    <q-editor
      dark
      class="bg-transparent"
      style="border: 1px solid #666666; border-radius: 8px"
      min-height="5rem"
      v-model="model"
      :content-style="{ display: isHtmlMode ? 'none' : 'block' }"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify'],
          },
        ],
        ['bold', 'italic', 'strike', 'underline'],
        ['hr', 'link'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
          },
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['undo', 'redo'],
        ['html'],
      ]"
      :definitions="{
        html: {
          tip: 'html',
          icon: 'save',
          label: 'html',
          handler: htmlClick,
        },
      }"
    />

    <copy-input
      v-if="isHtmlMode"
      :label="prop.label"
      :model-value="model"
      :hint="prop.description"
      filled
      dark
      :disable="!prop.editable"
      :copy-value="model"
    />

    <!-- <code-editor
      v-if="isHtmlMode"
      v-model="model"
      border_radius="8px"
      width="100%"
      theme=""
      :languages="[['html', 'HTML']]"
      :wrap_code="true"
    /> -->
  </template>

  <q-input
    v-else
    dark
    outlined
    :label="prop.label"
    :hint="prop.description"
    v-model="model"
  />
</template>

<style>
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}
code.hljs {
  padding: 3px 5px;
} /*!
  Theme: GitHub Dark
  Description: Dark theme as seen on github.com
  Author: github.com
  Maintainer: @Hirse
  Updated: 2021-05-15

  Outdated base version: https://github.com/primer/github-syntax-dark
  Current colors taken from GitHub's CSS
*/
.hljs {
  color: #c9d1d9;
  background: #0d1117;
  border: 1px solid #666666;
}
.hljs-doctag,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-variable.language_ {
  color: #ff7b72;
}
.hljs-title,
.hljs-title.class_,
.hljs-title.class_.inherited__,
.hljs-title.function_ {
  color: #d2a8ff;
}
.hljs-attr,
.hljs-attribute,
.hljs-literal,
.hljs-meta,
.hljs-number,
.hljs-operator,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-id,
.hljs-variable {
  color: #79c0ff;
}
.hljs-meta .hljs-string,
.hljs-regexp,
.hljs-string {
  color: #a5d6ff;
}
.hljs-built_in,
.hljs-symbol {
  color: #ffa657;
}
.hljs-code,
.hljs-comment,
.hljs-formula {
  color: #8b949e;
}
.hljs-name,
.hljs-quote,
.hljs-selector-pseudo,
.hljs-selector-tag {
  color: #7ee787;
}
.hljs-subst {
  color: #c9d1d9;
}
.hljs-section {
  color: #1f6feb;
  font-weight: 700;
}
.hljs-bullet {
  color: #f2cc60;
}
.hljs-emphasis {
  color: #c9d1d9;
  font-style: italic;
}
.hljs-strong {
  color: #c9d1d9;
  font-weight: 700;
}
.hljs-addition {
  color: #aff5b4;
  background-color: #033a16;
}
.hljs-deletion {
  color: #ffdcd7;
  background-color: #67060c;
}
</style>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import CSelect from '@src/components/elements/CSelect.vue';
import { IProp } from '@src/modules/appManager/shared/IAppConfig';
import { IOption } from '@src/modules/automation/useAppTriggerStore';
import CopyInput from '@components/elements/CopyInput.vue';
// import CodeEditor from 'simple-code-editor/CodeEditor.vue';

export default defineComponent({
  components: { CopyInput, CSelect }, // CodeEditor
  props: {
    modelValue: {
      type: Object as PropType<IOption | null>,
      default: null,
    },
    prop: {
      type: Object as PropType<IProp>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = computed<IOption | null>({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val);
      },
    });

    const updateFromOptions = () => {
      if (model.value && props.prop.values) {
        const selectedValue = props.prop.values.filter(
          (v) => v.value == model.value?.value
        )[0];
        if (selectedValue) model.value = selectedValue;
      }
    };
    watch(() => props.prop, updateFromOptions);
    onMounted(updateFromOptions);

    const isHtmlMode = ref(false);

    return {
      model,
      isHtmlMode,
      htmlClick: () => (isHtmlMode.value = !isHtmlMode.value),
    };
  },
});
</script>
