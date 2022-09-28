<template>
  <div class="over">
    <baidu-map id="allmap" :map-click="false" class="map bm-view" :center="center" :zoom="zoom" :scroll-wheel-zoom="scrollZoom"
      :inertial-dragging="inertial" @ready="handler" @click="drawLine">
      <!-- 定位 -->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true">
      </bm-geolocation>
      <!-- 缩放控件 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- 比例尺控件 -->
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <!---  大区域   -->
      <bm-polygon :path="Maker.path" :clicking="true" stroke-color="blue" fill-color="blue" :fill-opacity="0.1" :stroke-opacity="0.5"
        :stroke-weight="2" :editing="Maker.editing" @lineupdate="updateMaker">
      </bm-polygon>
      <!-- 小区域 -->
      <div v-if="xiaoshi">
        <bm-polygon :path="item.path" v-for="item,index of polygonPath" :clicking="true" :key="item.index" stroke-color="blue"
          :fill-color="item.fillColor" :fill-opacity="0.1" :stroke-opacity="0.5" :stroke-weight="2" :editing="item.editing"
          @lineupdate="updateSmall($event,index)" @mouseout="mouseout($event,index)" @mouseover="mouseover($event,index)"
          @click="clickSmall($event,index)">
        </bm-polygon>
      </div>

      <!-- 自定义定位图标覆盖物 -->
      <bm-marker :position="getCenterPoint(item.path)" v-for="(item, adIndex) of polygonPath" :key="adIndex.toString()"
        @click="infoWindowOpen(adIndex)">
        <bm-info-window :show="item.isShow" @close="infoWindowClose(adIndex)" @open="infoWindowOpen(adIndex)">
          {{item.quyu}}
        </bm-info-window>
      </bm-marker>
    </baidu-map>
    <!-- <div class="peisong">
            <div class="wuma">五马市场配送范围规划</div>
            <div class="m20 tk">
                <el-button type="primary" @click="starMaker">{{editing?'保存市场':'开始绘制'}}</el-button>
                <el-button type="primary" @click="clearMaker">删除大区域</el-button>
                <el-button type="primary" @click="starSmall">{{isEditing?'保存小区域':'绘制小区域'}}</el-button>
                <el-button type="primary" @click="editSmall(indexClick)">编辑小区域名称</el-button>
                <el-button type="primary" @click="editSmallFanWei(indexClick)">{{fanWei?'保存小区域范围':'编辑小区域范围'}}
                </el-button>
                <el-button type="primary" @click="deleteSmallFanWei">删除小区域</el-button>
                <el-button type="primary" @click="clearSmall">清空小区域</el-button>
            </div>
            <el-input v-model="position" placeholder="请输入想要搜索的位置" class="position"></el-input>
    <vue-scroll :ops="ops" style="height:60vh" v-if="polygonPath.length">
      <div class="m20">
        <div v-for="(item,index) in polygonPath" :key="index" class="lineHeight">
          <img src="@/assets/zb.png" class="zb">{{item.quyu}}
        </div>
      </div>
    </vue-scroll>
  </div> -->

    <!-- 编辑小区域弹窗 -->
    <!-- <el-dialog title="编辑区域名称" :visible.sync="dialogVisible" width="15%" :before-close="handleClose">
            <div class="flex">
                <el-form ref="form" :model="form">
                    <el-form-item label="区域名称：" prop="name" :label-width="formLabelWidth">
                        <el-input v-model="form.name" placeholder="请输入地区名称" maxlength="8" />
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="determine">确 定</el-button>
                <el-button @click="handleClose">取 消</el-button>
            </span>
        </el-dialog> -->
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: 'distribution',
  data() {
    return {
      position: '',//搜索位置
      zoom: 19,//缩放等级
      scrollZoom: true,//开启鼠标缩放
      inertial: true,//允许惯性拖拽
      center: '泰安',
      Maker: {
        editing: false,
        path: [
          {
            lng: 117.09041095828636,
            lat: 36.20757184260112
          },
          {
            lng: 117.09034358537312,
            lat: 36.20421185276448
          },
          {
            lng: 117.09845528412822,
            lat: 36.204142685681326
          },
          {
            lng: 117.09836994510476,
            lat: 36.20765556746687

          }
        ]
      },
      editing: false,//市场是否开启绘制
      isEditing: false,//小区域是否开启绘制
      polygonPath: [],//小区域集合
      isIndex: 0,//0代表绘制大区域，1代表绘制小区域
      dialogVisible: false,//是否打开编辑小区域弹窗
      form: {
        name: ''
      },
      formLabelWidth: '100px',//区域名称左侧宽度
      indexClick: -1,//当前选中第几个小区域
      fanWei: false,//是否开启编辑小区域范围
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: '#01a99a',
          opacity: 0,
          size: '10px',
          specifyBorderRadius: false,
          gutterOfEnds: null,    //轨道距 x 和 y 轴两端的距离
          gutterOfSide: '0',   //距离容器的距离
          keepShow: false,   //是否即使 bar 不存在的情况下也保持显示
          border: 'none'    //边框
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: '#ccc',   //颜色
        }
      },
      xiaoshi: true,
      MakerXiaoshi: true
    }
  },
  methods: {
    //地图初始化
    handler({ BMap, map }) {
      var point = new BMap.Point(117.16976, 36.17322)
      map.centerAndZoom(point, 19); // 将point点放入map中，展示在页面中心展示，10=缩放程度
      map.enableScrollWheelZoom(); // 开启滚动鼠标滑轮
    },
    // 鼠标左键键多边形绘制
    drawLine(e) {
      //0代表 绘制大市场，1代表 绘制小区域
      if (this.isIndex == 0) {
        //如果是不可编辑 直接退出
        if (this.editing == false) {
          return;
        }
        this.Maker.path.push(e.point);
      } else if (this.isIndex == 1) {
        //如果是不可编辑 直接退出
        if (this.isEditing == false) {
          return;
        }
        //多边形区域
        var ply = new BMap.Polygon(this.Maker.path);
        //判断点是否在多边形里
        var result = BMapLib.GeoUtils.isPointInPolygon(e.point, ply);

        if (result) {
          this.polygonPath[this.polygonPath.length - 1].path.push(e.point)
        } else {
          this.$message({
            message: '请在区域内绘制！',
            type: 'warning'
          });
          return
        }

      }
    },
    //更新市场路径
    updateMaker(e) {
      this.Maker.path = e.target.getPath();
    },
    //开始绘制市场
    starMaker() {
      //0代表绘制市场区域
      this.isIndex = 0
      //开启编辑状态
      this.editing = !this.editing;
      if (this.editing) {
        //设置该对象是可编辑状态
        this.Maker.editing = true;
      } else {
        this.saveMaker()
      }

    },
    // 保存市场
    saveMaker() {
      //更改为不可绘制状态
      this.editing = false;
      //保存立即修改当前编辑的状态为否
      this.Maker.editing = false;
    },
    //清除市场
    clearMaker() {
      this.Maker.path = []
      this.clearSmall()
      this.$message({
        message: '清除成功',
        type: 'success'
      });
    },
    //清除小区域
    clearSmall() {
      this.polygonPath = []
      this.$message({
        message: '清除成功',
        type: 'success'
      });
    },
    //绘制小区域
    starSmall() {
      //判断是否绘制完市场区域
      if (this.Maker.path.length < 3) {
        this.$message({
          message: '请先绘制市场区域，在绘制小区域！',
          type: 'warning'
        });
        return
      }
      //判断上个区域是否没有绘制完
      if (this.polygonPath.length > 0) {
        if (this.polygonPath[this.polygonPath.length - 1].editing) {
          this.polygonPath[this.polygonPath.length - 1].editing = false
        }
      }
      this.isEditing = !this.isEditing
      //1代表绘制小区域
      this.isIndex = 1
      //把市场编辑状态变成false
      this.Maker.editing = false;
      //小区域是否开启绘制
      if (this.isEditing) {
        const id = nanoid();
        this.polygonPath.push({ editing: false, path: [], fillColor: 'blue', isShow: true, quyu: '区域名称', id: id })
        this.polygonPath[this.polygonPath.length - 1].editing = true
      } else {
        this.savaSmall()
      }

    },
    //保存小区域
    savaSmall() {
      if (this.polygonPath.length == 0) {
        return
      }
      this.polygonPath[this.polygonPath.length - 1].editing = false
      //禁止编辑状态
      this.editing = false;
      //过滤不符合规则的数组
      this.polygonPath = this.polygonPath.filter(item => item.path.length >= 3)
    },
    //确定修改区域名称
    determine() {
      this.polygonPath[this.indexClick].quyu = this.form.name
      this.handleClose()
    },
    //离开小区域
    mouseout(e, index) {
      if (this.indexClick == index) {
        return
      }
      this.polygonPath[index].fillColor = 'blue'
    },
    //经过小区域
    mouseover(e, index) {
      if (this.indexClick == index) {
        return
      }
      this.polygonPath[index].fillColor = 'red'
    },
    //点击选中小区域
    clickSmall(e, index) {
      let list = []
      this.polygonPath.forEach(item => list.push(item.path[0]))
      this.indexClick = index
      this.uuid = this.polygonPath[index].id
      this.polygonPath[index].fillColor = 'red'
      //移除其他区域
      for (let i = 0; i < this.polygonPath.length; i++) {
        if (i != this.indexClick) {
          this.polygonPath[i].fillColor = 'blue'
        }
      }
    },
    //中心点
    getCenterPoint(path) {
      var x = 0.0;
      var y = 0.0;
      for (var i = 0; i < path.length; i++) {
        x = x + parseFloat(path[i].lng);
        y = y + parseFloat(path[i].lat);
      }
      x = x / path.length;
      y = y / path.length;
      return new BMap.Point(x, y);
    },
    //打开信息窗口
    infoWindowOpen(index) {
      this.polygonPath[index].isShow = true
    },
    //关闭信息窗口
    infoWindowClose(index) {
      this.polygonPath[index].isShow = false
    },
    //更新小区域路径
    updateSmall(e, index) {
      this.polygonPath[index].path = e.target.getPath();
    },
    //编辑小区域
    editSmall(index) {
      if (index < 0) {
        this.$message({
          message: '请选择要修改的小区域',
          type: 'warning'
        });
        return
      }
      this.form.name = this.polygonPath[index].quyu
      this.open()
    },
    //打开弹窗
    open() {
      this.dialogVisible = true
    },
    //关闭弹窗
    handleClose() {
      this.dialogVisible = false
    },
    //删除区域
    deleteSmallFanWei() {
      if (this.indexClick < 0) {
        this.$message({
          message: '请选择要删除的小区域',
          type: 'warning'
        });
        return
      }
      this.$confirm('是否删除此区域?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.zhiding()
        //重置被选中索引
        this.indexClick = -1,
          //关闭弹窗
          this.handleClose()
        //提示信息
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除区域'
        });
      });
    },
    //修改小区域范围
    editSmallFanWei(index) {
      if (index < 0) {
        this.$message({
          message: '请选择要编辑的小区域',
          type: 'warning'
        });
        return
      }
      this.fanWei = !this.fanWei
      if (this.fanWei) {
        this.polygonPath[this.indexClick].editing = true
      } else {
        this.polygonPath[this.indexClick].editing = false
      }
    },
    //删除指定小区域
    zhiding() {
      this.polygonPath.splice(this.indexClick, 1)
    },
  },
  //监视
  watch: {
    //监视小区域的变化，一旦发生变化就重新渲染
    polygonPath: function (params) {
      if (params) {
        this.xiaoshi = false
        this.$nextTick(() => {
          this.xiaoshi = true
        })
      }
    },
  },
  //生命开始
  mounted() {

    this.MakerXiaoshi = true
    console.log('我复活了');
  },
  //销毁生命周期
  destroyed() {
    this.MakerXiaoshi = false
    console.log('我销毁了');
  }

}
</script>

<style lang="scss" scoped>
#allmap {
  width: 86%;
  height: 80vh;
  float: left;
}

.flex {
  display: flex;
}

.peisong {
  border: 1px solid #ccc;
  width: calc(13%);
  float: right;
  height: 80vh;
  text-align: center;
}

.over {
  overflow: hidden;
}

.wuma {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.position {
  margin: 0 auto;
  width: 90%;
}

.el-form-item {
  margin-bottom: 0;
}

.lineHeight {
  line-height: 55px;
}

.zb {
  width: 20px;
}

.tk {
  button {
    margin-bottom: 20px;
  }
}
</style>