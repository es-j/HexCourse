const data = [];
let showData = [];
let sortedData = [];
const showList = document.querySelector(".showList");
const btng = document.querySelector(".button-group");
const searchBar = document.querySelector(".search-group");
const searchEnter = document.querySelector(".rounded-end");
const searchNotice = document.querySelector(".show-result");
const sortSelect = document.querySelector(".sort-select");
const sortSelectMobile = document.querySelector(".mobile-select");
const sortThead = document.querySelector(".js-sort-advanced");
axios
  .get("https://hexschool.github.io/js-filter-data/data.json")
  .then(function (response) {
    // console.log(response.status); 200 成功
    response.data.forEach(function (item, index) {
      let obj = {};
      obj.cropName = response.data[index].作物名稱;
      obj.marketName = response.data[index].市場名稱;
      obj.upperPrice = response.data[index].上價;
      obj.middlePrice = response.data[index].中價;
      obj.lowerPrice = response.data[index].下價;
      obj.averagePrice = response.data[index].平均價;
      obj.tradingVolume = response.data[index].交易量;
      obj.type = response.data[index].種類代碼;
      if (obj.cropName === null) {
        obj.cropName = "";
      }
      data.push(obj);
    });
    //renderData(data); 開啟頁面是否顯示資料
  });
function renderData(dataSet) {
  let str = "";
  dataSet.forEach(function (item, index) {
    let row = `<tr><td>${item.cropName}</td><td>${item.marketName}</td><td>${item.upperPrice}</td><td>${item.middlePrice}</td><td>${item.lowerPrice}</td><td>${item.averagePrice}</td><td>${item.tradingVolume}</td></tr>`;
    str += row;
  });
  showList.innerHTML = str;
}

btng.addEventListener("click", function (e) {
  showList.innerHTML = `資料載入中...`;
  sortSelect.value = "排序篩選";
  if (e.target.textContent == "蔬果") {
    showData = data.filter(function (item) {
      return item.type == "N04";
    });
  } else if (e.target.textContent == "水果") {
    showData = data.filter(function (item) {
      return item.type == "N05";
    });
  } else if (e.target.textContent == "花卉") {
    showData = data.filter(function (item) {
      return item.type == "N06";
    });
  }
  searchNotice.textContent = "";
  renderData(showData);
  searchEnter.value = "";
});

searchBar.addEventListener("click", function (e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  } else if (e.target.nodeName == "BUTTON") {
    showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">資料載入中...QQ</td></tr>`;
    let value = searchEnter.value.trim();
    if (value === "") {
      showData = data.filter(function (item) {
        return item.cropName === "";
      });
    } else {
      showData = data.filter(function (item) {
        return item.cropName.includes(value);
      });
    }
    renderData(showData);
    if (showData.length == 0) {
      showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">查詢不到當日的交易資訊QQ</td></tr>`;
    }
    searchNotice.textContent = `查看「${value}」的比價結果`;
    searchEnter.value = "";
  }
});

sortSelect.addEventListener("click", function (e) {
  if (sortSelect.value.includes("上價") == true) {
    showData.sort(function (a, b) {
      return b.upperPrice - a.upperPrice;
    });
  } else if (sortSelect.value.includes("中價") == true) {
    showData.sort(function (a, b) {
      return b.middlePrice - a.middlePrice;
    });
  } else if (sortSelect.value.includes("下價") == true) {
    showData.sort(function (a, b) {
      return b.lowerPrice - a.lowerPrice;
    });
  } else if (sortSelect.value.includes("平均價") == true) {
    showData.sort(function (a, b) {
      return b.averagePrice - a.averagePrice;
    });
  } else if (sortSelect.value.includes("交易量") == true) {
    showData.sort(function (a, b) {
      return b.tradingVolume - a.tradingVolume;
    });
  }
  renderData(showData);
});

sortSelectMobile.addEventListener("click", function (e) {
  if (sortSelectMobile.value.includes("上價") == true) {
    showData.sort(function (a, b) {
      return b.upperPrice - a.upperPrice;
    });
  } else if (sortSelectMobile.value.includes("中價") == true) {
    showData.sort(function (a, b) {
      return b.middlePrice - a.middlePrice;
    });
  } else if (sortSelectMobile.value.includes("下價") == true) {
    showData.sort(function (a, b) {
      return b.lowerPrice - a.lowerPrice;
    });
  } else if (sortSelectMobile.value.includes("平均價") == true) {
    showData.sort(function (a, b) {
      return b.averagePrice - a.averagePrice;
    });
  } else if (sortSelectMobile.value.includes("交易量") == true) {
    showData.sort(function (a, b) {
      return b.tradingVolume - a.tradingVolume;
    });
  }
  renderData(showData);
});

sortThead.addEventListener("click", function (e) {
  if (
    (e.target.getAttribute("data-price") == "上價" &&
      e.target.getAttribute("data-sort") == "down") ||
    e.target.textContent.trim() == "上價"
  ) {
    showData.sort(function (a, b) {
      return b.upperPrice - a.upperPrice;
    });
  } else if (
    (e.target.getAttribute("data-price") == "上價" &&
      e.target.getAttribute("data-sort") == "up") ||
    e.target.textContent.trim() == "上價"
  ) {
    showData.sort(function (a, b) {
      return a.upperPrice - b.upperPrice;
    });
  } else if (
    (e.target.getAttribute("data-price") == "中價" &&
      e.target.getAttribute("data-sort") == "down") ||
    e.target.textContent.trim() == "中價"
  ) {
    showData.sort(function (a, b) {
      return b.middlePrice - a.middlePrice;
    });
  } else if (
    (e.target.getAttribute("data-price") == "中價" &&
      e.target.getAttribute("data-sort") == "up") ||
    e.target.textContent.trim() == "中價"
  ) {
    showData.sort(function (a, b) {
      return a.middlePrice - b.middlePrice;
    });
  } else if (
    (e.target.getAttribute("data-price") == "下價" &&
      e.target.getAttribute("data-sort") == "down") ||
    e.target.textContent.trim() == "下價"
  ) {
    showData.sort(function (a, b) {
      return b.lowerPrice - a.lowerPrice;
    });
  } else if (
    (e.target.getAttribute("data-price") == "下價" &&
      e.target.getAttribute("data-sort") == "up") ||
    e.target.textContent.trim() == "下價"
  ) {
    showData.sort(function (a, b) {
      return a.lowerPrice - b.lowerPrice;
    });
  } else if (
    (e.target.getAttribute("data-price") == "平均價" &&
      e.target.getAttribute("data-sort") == "down") ||
    e.target.textContent.trim() == "平均價"
  ) {
    showData.sort(function (a, b) {
      return b.averagePrice - a.averagePrice;
    });
  } else if (
    (e.target.getAttribute("data-price") == "平均價" &&
      e.target.getAttribute("data-sort") == "up") ||
    e.target.textContent.trim() == "平均價"
  ) {
    showData.sort(function (a, b) {
      return a.averagePrice - b.averagePrice;
    });
  } else if (
    (e.target.getAttribute("data-price") == "交易量" &&
      e.target.getAttribute("data-sort") == "down") ||
    e.target.textContent.trim() == "交易量"
  ) {
    showData.sort(function (a, b) {
      return b.tradingVolume - a.tradingVolume;
    });
  } else if (
    (e.target.getAttribute("data-price") == "交易量" &&
      e.target.getAttribute("data-sort") == "up") ||
    e.target.textContent.trim() == "交易量"
  ) {
    showData.sort(function (a, b) {
      return a.tradingVolume - b.tradingVolume;
    });
  }
  renderData(showData);
});
