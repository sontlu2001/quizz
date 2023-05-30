axios.get('https://sheetdb.io/api/v1/m0czdadxqtg5k?sheet=QuizTest')
  .then(function (response) {
    // set title Quiz
    document.querySelector('.subject-exam').innerHTML = `${response.data[0].Name}`
    // get first Quiz 
    return response.data[0];
  })
  .then(function (quizz) {
    // get URL bài thi
    return quizz.url;
  })
  .then(function (url) {
    // render
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (questions) {
        let index = 0;
        let answer = null;
        let listquestion = [];
        let checkSubmit = false;
        const answerList = ['A', 'B', 'C', 'D'];
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
          answerList.forEach((e) => {
            // A,B,C,D
            let answerArr = document.querySelector(`.answer${e}`);
            answerArr.className = `answer answer${e}`;
          })

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
          // render list answer
          answerList.forEach((e) => {
            let answerArr = document.querySelector(`.answer${e}`);
            let answer__lable = answerArr.querySelector(".lable");
            let answer__Content = answerArr.querySelector(".Content");

            answer__Content.innerHTML = listquestion[index][e];
            answerArr.onclick = function () {
              answer = e;
              ResetColor();
              answer__lable.className = "lable active--lable";
              answer__Content.className = "Content active--Content";
            };
          })
        }
        //Add cau dau tien
        addInfoQuestion(index);

        //handle Click chuyen cau
        var btnCauSau = document.querySelector(".btnNext");
        btnCauSau.onclick = function (e) {
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
          if (listquestion[pos].DapAn !== listquestion[pos]['TraLoi']) {
            switch (listquestion[pos]['TraLoi']) {
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
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

