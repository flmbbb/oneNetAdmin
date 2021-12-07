<template>
  <div
    :id="containerSet.id"
    :style="containerSet.style"
    @click="onclick(containerSet)"
  >
    <template v-for="item in containerSet.children" :key="item.id">
      <div :id="item.id" :style="item.style" @click="onclick(item)">
        <template v-for="itemB in item.children" :key="itemB.id">
          <div :id="itemB.id" :style="itemB.style" @click="onclick(itemB)">
            <template v-for="itemC in itemB.children" :key="itemC.id">
              <div
                :id="itemC.id"
                :style="itemC.style"
                @click="onclick(itemC)"
              ></div>
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import { TReportContainerSet } from "./ReportClass";
@Options({
  name: "ReportContainer",
  components: {},
  computed: {},
})
export default class ReportContainer extends Vue {
  public containerSet: TReportContainerSet = new TReportContainerSet();
  private onclick(qItem: TReportContainerSet) {
    alert(qItem.id);
    window.event?.stopPropagation();
  }
}
</script>
<style  >
.mydiv {
  border: 1px solid;
  background-color: cadetblue;
  border-top: none;
}
</style>