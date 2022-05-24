var questionAPI =
  "https://script.google.com/macros/s/AKfycbwQhzY6eGuExIbSfA0hQXZU4Zz33ztWOnTSQvbaHG8HXs2f86gLbUWtx1YZF-vUVH5X/exec";

fetch(questionAPI)
  .then(function (res) {
    return res.json();
  })
  .then(function (questions) {
    let index = 0;
    let answer = null;
    let listquestion = [];
    let checkSubmit = false;
    listquestion.push(...questions);
    //render listcauhoi
    var htmls = listquestion.map((question, index) => {
      return `
          <div id=${question.ID} class="card">
              <h4 class="card-title">Câu ${question.ID}</h4>
              <p class="card-text">?</p>
            </div>
          `;
    });
    var html = htmls.join("");
    document.querySelector(".list__question").innerHTML = html;

    //Reset active
    function ResetColor() {
      let listAnswer__Contents = document.querySelectorAll(".answer .Content");
      listAnswer__Contents.forEach((element) => {
        element.className = "Content";
      });
      let listAnswer__lables = document.querySelectorAll(".answer .lable");
      listAnswer__lables.forEach((element) => {
        element.className = "lable";
      });
      let answerA = document.querySelector(".answerA");
      answerA.className = "answer answerA";
      let answerB = document.querySelector(".answerB");
      answerB.className = "answer answerB";
      let answerC = document.querySelector(".answerC");
      answerC.className = "answer answerC";
      let answerD = document.querySelector(".answerD");
      answerD.className = "answer answerD";
    }
    //function render cau hoi va dap an
    function addInfoQuestion(index) {
      let titleQuestion = document.querySelector(".question>h4");
      //Title
      let str = listquestion[index].CauHoi;

      titleQuestion.innerHTML = listquestion[index].CauHoi;

      //Picture
      if (listquestion[index].HinhAnh != null) {
        let picture = document.querySelector(".picture");
        picture.className = "picture";
        picture.src = `${listquestion[index].HinhAnh}`;
      }
      //A
      let answerA = document.querySelector(".answerA");
      let answerA__lable = answerA.querySelector(".lable");
      let answerA__Content = answerA.querySelector(".Content");

      answerA__Content.innerHTML = listquestion[index].A;
      answerA.onclick = function () {
        answer = "A";
        ResetColor();
        answerA__lable.className = "lable active--lable";
        answerA__Content.className = "Content active--Content";
      };
      //B
      let answerB = document.querySelector(".answerB");
      let answerB__lable = answerB.querySelector(".lable");
      let answerB__Content = answerB.querySelector(".Content");

      answerB__Content.innerHTML = listquestion[index].B;
      answerB.onclick = function () {
        answer = "B";
        ResetColor();
        answerB__lable.className = "lable active--lable";
        answerB__Content.className = "Content active--Content";
      };
      //C
      let answerC = document.querySelector(".answerC");
      let answerC__lable = answerC.querySelector(".lable");
      let answerC__Content = answerC.querySelector(".Content");

      answerC__Content.innerHTML = listquestion[index].C;
      answerC.onclick = function () {
        answer = "C";
        ResetColor();
        answerC__lable.className = "lable active--lable";
        answerC__Content.className = "Content active--Content";
      };
      //D
      let answerD = document.querySelector(".answerD");
      let answerD__lable = answerD.querySelector(".lable");
      let answerD__Content = answerD.querySelector(".Content");

      answerD__Content.innerHTML = listquestion[index].D;
      answerD.onclick = function () {
        answer = "D";
        ResetColor();
        answerD__lable.className = "lable active--lable";
        answerD__Content.className = "Content active--Content";
      };
      MathJax.typesetPromise();
    }
    //Add cau dau tien
    addInfoQuestion(index);

    //handle Click chuyen cau
    var btnCauSau = document.querySelector(".btnNext");
    btnCauSau.onclick = function () {
      //Đổi màu card
      var listCardQuestion = document.querySelectorAll(".card");
      listCardQuestion[index].classList.add("active--lable");
      if (checkSubmit) {
        index++;
        addInfoQuestion(index);
        ResetColor();
        renderResult(index);
      } else {
        let cardItem = document.querySelectorAll("p.card-text");
        //Gán đáp án cho card
        cardItem[index].innerHTML = answer;
        //Gán đán án cho list
        listquestion[index].TraLoi = answer;
        if (index === listquestion.length - 1) {
          alert("Đã hết câu hỏi");
          return 0;
        }
        index++;
        addInfoQuestion(index);
        ResetColor();
        answer = "";
      }
    };

    //function hiển thị đáp án đúng or sai
    function renderResult(pos) {
      let answerA = document.querySelector(".answerA");
      let answerB = document.querySelector(".answerB");
      let answerC = document.querySelector(".answerC");
      let answerD = document.querySelector(".answerD");
      switch (listquestion[pos].DapAn) {
        case "A":
          answerA.className = "answer answerA bg--true";
          break;
        case "B":
          answerB.className = "answer answerB bg--true";
          break;
        case "C":
          answerC.className = "answer answerC bg--true";
          break;
        case "D":
          answerD.className = "answer answerD bg--true";
          break;
      }
      if (listquestion[pos].DapAn !== listquestion[pos].TraLoi) {
        switch (listquestion[pos].TraLoi) {
          case "A":
            answerA.className = "answer answerA bg--false";
            break;
          case "B":
            answerB.className = "answer answerB bg--false";
            break;
          case "C":
            answerC.className = "answer answerC bg--false";
            break;
          case "D":
            answerD.className = "answer answerD bg--false";
            break;
        }
      }
    }

    // handleSubmit
    let btnSubmit = document.querySelector("button.btn.btnSubmit");
    btnSubmit.onclick = function () {
      ResetColor();
      checkSubmit = true;
      displayResult();
    };
    //displayResult
    function displayResult() {
      let count = 0;
      let listcard__text = document.querySelectorAll("p.card-text");
      listquestion.forEach((question, index) => {
        listcard__text[index].innerHTML = "";
        let nodeIcon = document.createElement("i");
        if (question.TraLoi === question.DapAn) {
          count++;
          nodeIcon.className = "fa-solid fa-check true";
          listcard__text[index].appendChild(nodeIcon);
        } else {
          nodeIcon.className = "fa-solid fa-xmark false";
          listcard__text[index].appendChild(nodeIcon);
        }
      });
      alert(`Bạn trả lời đúng ${count} câu !`);
    }
    //Handle Click card
    var listCards = document.querySelectorAll(".card");
    listCards.forEach((item, pos) => {
      item.onclick = function () {
        index = pos;
        ResetColor();
        DapAn = "";
        addInfoQuestion(pos);
        if (checkSubmit) {
          //Hiển thị đáp án đúng or sai
          renderResult(pos);
        }
      };
    });
  });
