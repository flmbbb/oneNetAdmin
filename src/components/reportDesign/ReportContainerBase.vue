<template>
  <div :style="onContainerSet.style" @click="onclick(onContainerSet)"></div>
</template>
<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { evenReportCallBackClick, TReportContainerSet } from "./ReportClass";
@Options({
  name: "ReportContainerBase",
  components: {},
  computed: {},
})
export default class ReportContainerBase extends Vue {
  @Prop() onContainerSet?: TReportContainerSet;
  @Prop() onCallBackClick?: evenReportCallBackClick;
  private onclick(qSet: TReportContainerSet) {
    if (this.onCallBackClick != undefined) {
      this.onCallBackClick(qSet);
    }
  }
}
</script>