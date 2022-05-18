import { gsap } from 'gsap'

export default class Reviews {
    constructor() {
        //Uncomment when configured
        //this.init();
    }

    /* ---------------------- */
    /* ----- GMB Reviews ---- */
    /* ---------------------- */
    initReviews(){
      function oAuth_Identification() {
        //Identification
        //Paramètres
        var id = null;
        var requestParam = {
          "client_secret": "5F2KQQ75N9BoffQI1_gdNmFP",
          "grant_type": "refresh_token",
          "refresh_token": "1//04NlMOWako6sHCgYIARAAGAQSNwF-L9Ire9RX6XY5Qmj_FT-_MOsifGLm9qI3xXyeg8Ss5T62MYLlczF76IuJlKMaLo_zqzL01-I",
          "client_id": "980491600770-e0joht1qqegpt5qe1d0savi15aj804bv.apps.googleusercontent.com"
        }
        //Requête
        var request = new XMLHttpRequest();
        request.open('POST', 'https://www.googleapis.com/oauth2/v4/token', true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onloadend = function () {
          var data = JSON.parse(request.response);
          if (!data.error) {
            oAuth_getLocation(data.token_type, data.access_token);
          }
          else {
            console.log('Error');
          }
        }
        request.send(JSON.stringify(requestParam));
      }
      oAuth_Identification();

      function oAuth_getLocation(token_type, access_token) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://mybusiness.googleapis.com/v4/accounts/104078800278148811568/locations/13889956030169970757', true);
        request.setRequestHeader('Authorization', token_type + ' ' + access_token);
        request.onloadend = function () {
          var data = JSON.parse(request.response);
          if (!data.error) {
            oAuth_getReviews(data.name, token_type, access_token);
          }
          else {
            console.log('Error');
          }
        }
        request.send();
      }

      function oAuth_getReviews(location, token_type, access_token) {
        var request = new XMLHttpRequest();
        var requestData = {
          "locationNames": location,
          "pageSize": 200,
          "ignoreRatingOnlyReviews": false
        }

        request.open('POST', 'https://mybusiness.googleapis.com/v4/accounts/104078800278148811568/locations:batchGetReviews', true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader('Authorization', token_type + ' ' + access_token);
        request.onloadend = function () {
          var data = JSON.parse(request.response);

          if (!data.error) {
            data = data.locationReviews;
            //Mise en forme tableau avis
            var reviews = [];
            if (data) {
              for (var i = 0; i < data.length; i++) {
                var elem = [];
                var tempData = data[i];

                elem.locationName = tempData.name;
                elem.rating = convertStarToNb(tempData.review.starRating);
                elem.author = tempData.review.reviewer.displayName;
                elem.comment = tempData.review.comment;
                elem.date = convertDate(tempData.review.createTime);
                if (elem.rating >= 4) {
                  reviews.push(elem);
                }
              }
            }
            //On injecte dans le HTML
            if (document.querySelector('.reviews-listing')) {
              displayReviews('.reviews-listing .swiper-wrapper', reviews);
            }

          }
          else {
            console.log('Error');
          }
        }
        request.send(JSON.stringify(requestData));
      }

      function displayReviews(selectorParent, reviews) {
        var parent = document.querySelector(selectorParent);
        for (let index = 0; index < reviews.length; index++) {
          if (reviews[index].comment !== undefined) {
            var author = reviews[index].author;
            var date = reviews[index].date;
            var rating = reviews[index].rating;
            var comment = truncate(reviews[index].comment, 250);

            var stars = '';
            var svg = ' <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23.964" viewBox="0 0 24 23.964"><path d="M23.363,8.584,15.985,7.457,12.678.413a.781.781,0,0,0-1.357,0L8.015,7.457.637,8.584A.75.75,0,0,0,.214,9.849l5.36,5.494L4.307,23.11a.751.751,0,0,0,1.1.777L12,20.245l6.59,3.643a.75.75,0,0,0,1.1-.777l-1.267-7.767,5.36-5.494a.751.751,0,0,0-.423-1.266Z" transform="translate(0 -0.018)" fill="#ffe423" /></svg>'
            for (let i = 0; i < reviews[index].rating; i++) {
              stars = stars + svg;
            }


            var elem = document.createElement('div');
            var content = `
          <div class="review-container">
            <div class="review-author">
              <span>${author}</span>
            </div>
            <div class="review-metas">
              <div class="review-stars">
                ${stars}
              </div>
              <div class="review-date">
                <span>${date}</span>
              </div>
            </div>
            <div class="review-comment">
              <p>${comment.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          `;
            elem.setAttribute("class", `swiper-slide item-avis rate_${rating} card card--typeA`);
            elem.innerHTML = content.trim();
            parent.appendChild(elem);
          }
        }

        let slider = document.querySelector('.reviews-listing');
        if (slider) {
          if (!!window.IntersectionObserver) {
            let observer = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                let slides = entry.target.querySelectorAll('.swiper-slide');
                if (entry.isIntersecting) {
                  gsap.to(slides, {
                    duration: .8,
                    opacity: 1,
                    ease: 'Sine.easeOut',
                    stagger: 0.15,
                  });
                }
              });
            }, { threshold: 0.2 });
            observer.observe(slider);
          }
        }
      }

      function truncate(str, n) {
        return (str.length > n) ? str.substr(0, n - 1) + '&hellip;' : str;
      };

      function convertStarToNb(value) {
        switch (value) {
          case 'ONE':
            value = 1;
            break;
          case 'TWO':
            value = 2;
            break;
          case 'THREE':
            value = 3;
            break;
          case 'FOUR':
            value = 4;
            break;
          case 'FIVE':
            value = 5;
            break;
        }
        return value;
      }

      function convertDate(date) {
        var now = new Date();
        var reviewDate = new Date(date);
        var months;
        var result;
        months = (now.getFullYear() - reviewDate.getFullYear()) * 12;
        months -= reviewDate.getMonth() + 1;
        months += now.getMonth();

        if (months <= 0) {
          result = 'Il y a moins d\'un mois';
        } else if (months >= 1 && months < 12) {
          result = 'Il y a ' + months + ' mois'
        } else if (months >= 12 && months < 24) {
          result = 'Il y a 1 an';
        } else if (months >= 24) {
          result = 'Il y a plus d\'1 an';
        }
        return result;
      }
    }

    init() {
        this.initReviews();
    }
}