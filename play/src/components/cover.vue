<template>
  <div>
    <span @click="handleClick">{{ labelContent }}</span>
    <label v-for="label in labels" :key="label.type">
      <input
        type="radio"
        name="pointType"
        :checked="label.type === activeType"
        @change="activeType = label.type"
      />
      {{ label.name }}
    </label>
    <baidu-map
      v-if="activeType === 'point'"
      class="map"
      :center="{ lng: 113.73099, lat: 27.984867 }"
      :zoom="8"
    >
      <bm-marker
        :position="{ lng: 113.73099, lat: 27.984867 }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <bm-label
          content="我爱北京天安门"
          :labelStyle="{ color: 'red', fontSize: '24px' }"
          :offset="{ width: -35, height: 30 }"
        />
      </bm-marker>
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'customPoint'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
    >
      <bm-marker
        :position="{ lng: 116.404, lat: 39.915 }"
        :dragging="true"
        :icon="{
          url: './heifahaizei.png',
          size: {
            width: 52,
            height: 26,
          },
          opts: {
            imageSize: {
              width: 20,
              height: 20,
            },
          },
        }"
      >
      </bm-marker>
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'infoPoint'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
    >
      <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
        <bm-info-window :show="true">
          <p>{{ markerInfo.title }}</p>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'massivePoint'"
      class="map"
      :center="{ lng: 105.0, lat: 38.0 }"
      :zoom="4"
      :scroll-wheel-zoom="true"
      @init="addPoints"
    >
      <!-- <bm-point-collection :points="[{lat:37.405247,lng:109.49779}]" /> -->
      <bm-point-collection
        :points="points"
        shape="BMAP_POINT_SHAPE_STAR"
        color="red"
        size="BMAP_POINT_SIZE_SMALL"
        @click="clickHandler"
      >
      </bm-point-collection>
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'blokenLine'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
      :scroll-wheel-zoom="true"
    >
      <bm-polyline
        :path="polylinePath"
        stroke-color="blue"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        :editing="true"
        @lineupdate="updatePolylinePath"
      >
      </bm-polyline>
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'polygon'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
    >
      <bm-polygon
        v-if="showPolygon"
        :path="polygonPath"
        stroke-color="blue"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        :editing="true"
        @lineupdate="updatePolygonPath"
      />
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'circle'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
    >
      <bm-circle
        :center="circlePath.center"
        :radius="circlePath.radius"
        stroke-color="blue"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        @lineupdate="updateCirclePath"
        :editing="true"
      ></bm-circle>
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'ground'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="12"
    >
      <bm-ground
        :bounds="bounds"
        imageURL="//developer.baidu.com/map/jsdemo/img/si-huan.png"
        :opacity="1"
        :displayOnMinLevel="10"
        :displayOnMaxLevel="14"
      >
      </bm-ground>
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'label'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
    >
      <bm-label
        content="我爱北京天安门"
        :position="{ lng: 116.404, lat: 39.915 }"
        :labelStyle="{ color: 'red', fontSize: '24px' }"
        title="Hover me"
      />
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'infoWin'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
    >
      <bm-info-window
        :position="{ lng: markerPoint.lng, lat: markerPoint.lat }"
        title="Info Window Title"
        :show="infoWindow.show"
        @close="infoWinClose"
        @open="infoWinOpen"
      >
        <p @click="onContentClick">{{ infoWinContent }}</p>
        <button @click="clear">Clear</button>
      </bm-info-window>
    </baidu-map>
    <baidu-map
      v-else-if="activeType === 'customOverlay'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
    >
      <bm-overlay
        pane="labelPane"
        :class="{ sample: true, active }"
        @draw="draw"
        @mouseover="active = true"
        @mouseleave="active = false"
      >
        <div>我爱北京天安门</div>
      </bm-overlay>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";

const activeType = ref("polygon");
const infoWinContent = ref("我是内容");
const labels = ref([
  { name: "跳跃点", type: "point" },
  { name: "自定义图标点", type: "customPoint" },
  { name: "点击弹窗", type: "infoPoint" },
  { name: "海量点", type: "massivePoint" },
  { name: "折线", type: "blokenLine" },
  { name: "多边形", type: "polygon" },
  { name: "圆形", type: "circle" },
  { name: "地面", type: "ground" },
  { name: "标签", type: "label" },
  { name: "信息窗体", type: "infoWin" },
  { name: "自定义覆盖物", type: "customOverlay" },
]);
const markerPoint = ref({ lng: 116.404, lat: 39.915 });
const show = ref(false);
const markerInfo = reactive({
  title: "我爱北京",
});
setTimeout(() => {
  markerInfo.title = "wahaha";
}, 3000);
const points = ref([]);
const polylinePath = ref([
  { lng: 116.404, lat: 39.915 },
  { lng: 116.405, lat: 39.82 },
  { lng: 116.423493, lat: 39.707445 },
]);
const polygonPath = ref([
  { lng: 116.412732, lat: 39.911707 },
  { lng: 116.39455, lat: 39.910932 },
  { lng: 116.403461, lat: 39.921336 },
]);
const circlePath = ref({
  center: {
    lng: 116.404,
    lat: 39.915,
  },
  radius: 500,
});
const bounds = ref({
  ne: {
    lng: 116.475451,
    lat: 39.9764,
  },
  sw: {
    lng: 116.29579,
    lat: 39.837146,
  },
});
const infoWindow = ref({
  show: true,
  contents:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
});
const active = ref(false);
const showPolygon = ref(true);

const handleClick = () => {
  showPolygon.value = !showPolygon.value;
};

const infoWindowOpen = () => {
  show.value = true;
};

const infoWindowClose = () => {
  show.value = false;
};

const clickHandler = (e) => {
  alert(`单击点的坐标为：${e.point.lng}，${e.point.lat}`);
};

const addPoints = () => {
  const pointAll = [];
  for (var i = 0; i < 1000; i++) {
    const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 };
    pointAll.push(position);
  }
  points.value = pointAll;
};

const updatePolylinePath = (e) => {
  polylinePath.value = e.target.getPath();
};

const addPolylinePoint = () => {
  polylinePath.value.push({ lng: 116.404, lat: 39.915 });
};

const updatePolygonPath = (e) => {
  polygonPath.value = e.target.getPath();
};

const addPolygonPoint = () => {
  polygonPath.value.push({ lng: 116.404, lat: 39.915 });
};

const updateCirclePath = (e) => {
  circlePath.value.center = e.target.getCenter();
  circlePath.value.radius = e.target.getRadius();
};

const infoWinClose = (e) => {
  infoWindow.value.show = false;
};

const infoWinOpen = (e) => {
  infoWindow.value.show = true;
};

const clear = () => {
  infoWindow.value.contents = "";
};

const draw = ({ el, BMap, map }) => {
  const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915));
  el.style.left = pixel.x - 60 + "px";
  el.style.top = pixel.y - 20 + "px";
};

const onContentClick = () => {
  infoWinContent.value = "我是内容修改后";
};
// addPoints();
</script>

<style>
.sample {
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}

.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
</style>
