/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';


document.addEventListener('DOMContentLoaded',()=>{
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv=document.querySelectorAll('.promo__adv img'),
          poster=document.querySelector(".promo__bg"),
          genre=document.querySelector(".promo__genre"),
          movieList=document.querySelector('.promo__interactive-list'),
          addForm=document.querySelector('form.add');
          let addInput=addForm.querySelector('.adding__input'),
          checkbox=addForm.querySelector("[type=checkbox]");
    addForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        const NewFilm=addInput.value;
        const fav=checkbox.checked;
        if(NewFilm.length>21){
            NewFilm=`${NewFilm.substring(0,22)}...`
        }

        movieDB.movies.push(NewFilm);
        SortArr(movieDB.movies);
        createMovieList(movieDB.movies,movieList);
        event.target.reset();
    });

    const DeleteAdv=(arr)=>{
        arr.forEach(item=>{
            item.remove();
        });
    }
    DeleteAdv(adv);
    

    const makeChanges=()=>{
        genre.textContent='Драма';
        poster.style.backgroundImage='url("img/bg.jpg")';   
    };
    makeChanges();

    const SortArr=(arr)=>{
        arr.sort();
    }
    SortArr(movieDB.movies);


    movieDB.movies.sort();
    function createMovieList(films,parent){
        parent.innerHTML='';
        films.forEach((film,i) => {
            parent.innerHTML += `
               <li class='promo__interactive-item'>${i+1} ${film}
                    <div class='delete'></div>
               </li>
            `;
        });
        document.querySelectorAll(".delete").forEach((btn,i)=>{
            btn.addEventListener('click',()=>{
                btn.parentElement.remove();
                movieDB.movies.splice(i,1);
            })
        });
    }
    createMovieList(movieDB.movies,movieList);
});