let todo = [
  {
    detail: "complete",
    done: true,
  },
  {
    detail: "incomplete",
    done: false,
  },
];
let leftTodo = [];
let finishedTodo = [];

const inputBtn = document.querySelector(".btn_add");
let inputDetail = document.querySelector("input");
const tab = document.querySelector(".tab");
let active = document.querySelector(".active");
const amountLeft = document.querySelector(".list_footer p");
const list = document.querySelector(".list");
const deleteFinished = document.querySelector(".list_footer a");
const deleteBtn = document.querySelector(".delete");
const wholeList = document.querySelector(".card_list");

function numberingTodo() {
  todo.forEach(function (item, index) {
    item.num = index;
  });
}

function sort() {
  leftTodo = [];
  finishedTodo = [];
  todo.forEach(function (item) {
    if (item.done == true) {
      finishedTodo.push(item);
    } else if (item.done == false) {
      leftTodo.push(item);
    }
  });
}

function showTodo() {
  if (todo.length == 0) {
    wholeList.style.display = `none`;
  } else if (todo.length !== 0) {
    wholeList.style.display = `block`;
    if (active.textContent == "全部") {
      renderData(todo);
      amountLeft.textContent = `${leftTodo.length} 個待完成項目`;
    } else if (active.textContent == "待完成") {
      renderData(leftTodo);
      amountLeft.textContent = `${leftTodo.length} 個待完成項目`;
    } else if (active.textContent == "已完成") {
      renderData(finishedTodo);
      amountLeft.textContent = `${finishedTodo.length} 個已完成項目`;
    }
  }
}

function renderData(e) {
  let str = "";
  e.forEach(function (item, index) {
    let obj = ``;
    if (item.done == true) {
      obj = `<li><label class="checkbox" for=""><input data-num="${item.num}" type="checkbox" checked /><span>${item.detail}</span></label><a href="#" class="delete" data-num="${item.num}"></a></li>`;
    } else if (item.done == false) {
      obj = `<li><label class="checkbox" for=""><input data-num="${item.num}" type="checkbox" /><span>${item.detail}</span></label><a href="#" class="delete" data-num="${item.num}"></a></li>`;
    }
    str += obj;
  });
  list.innerHTML = str;
}

function init() {
  numberingTodo();
  sort();
  showTodo();
}
init();

tab.addEventListener("click", function (e) {
  if (e.target.textContent == "全部") {
    tab.innerHTML = `<li class="active">全部</li>
    <li>待完成</li>
    <li>已完成</li>`;
    active = document.querySelector(".active");
  } else if (e.target.textContent == "待完成") {
    tab.innerHTML = `<li>全部</li>
    <li class="active">待完成</li>
    <li>已完成</li>`;
    active = document.querySelector(".active");
  } else if (e.target.textContent == "已完成") {
    tab.innerHTML = `<li>全部</li>
    <li >待完成</li>
    <li class="active">已完成</li>`;
    active = document.querySelector(".active");
  }
  showTodo();
});

inputBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputDetail.value == "") {
    alert(`請輸入代辦事項`);
  } else {
    let obj = {};
    obj.detail = inputDetail.value;
    obj.done = false;
    todo.unshift(obj);
    init();
    inputDetail.value = "";
  }
});

deleteFinished.addEventListener("click", function (e) {
  e.preventDefault();
  todo = todo.filter(function (item) {
    return item.done == false;
  });
  init();
});

// delete item and change state
list.addEventListener("click", function (e) {
  if (e.target.nodeName == "A") {
    e.preventDefault();
    todo.splice(e.target.getAttribute("data-num"), 1);
    numberingTodo();
  } else if (e.target.nodeName == "INPUT") {
    e.preventDefault();
    if (todo[e.target.getAttribute("data-num")].done == true) {
      todo[e.target.getAttribute("data-num")].done = false;
    } else if (todo[e.target.getAttribute("data-num")].done == false) {
      todo[e.target.getAttribute("data-num")].done = true;
    }
  } else {
    return;
  }
  sort();
  showTodo();
});
