var books = [
        {
            "title": "The Odyssey",
            "author": "Homer",
            "description": "Epic journey of epic hero."
        },
        {
            "title": "Romeo and Juliet",
            "author": "William Shakespeare",
            "description": "Tragic story of love and death..."
        },
        {
            "title": "Don Quixote",
            "author": "Miguel de Cervantes",
            "description": "Windmills!"
        },
        {
            "title": "Necronomicon",
            "author": "",
            "description": "Don't even touch bloody pages of this book!"
        },
        {
            "title": "",
            "author": "Me",
            "description": "I did't write any book yet :("
        },
        {
            "title": "The Captain's Daughter",
            "author": "Alexander Pushkin",
            "description": "Young lovers caught up in Pugachev’s peasant-Cossack revolt against Catherine the Great."
        },
        {
            "title": "The Holy Quran",
            "author": "",
            "description": "Great philosophy, corrupted by extrimists in our days."
        }
    ],
    app = {
        iterateJSON: function (json) {
            var listItems = '';
            if ( !(json instanceof Object) ) {
                return false;
            } else {
                listItems = json.reduce(function(list,el){
                    if (el.title !== '') {
                        list += '<li class="book cf">\n'+
                            '<span class="book-title">'+el.title+'</span>\n'+
                            '<span class="book-author">'+(el.author?el.author:'Unknown')+'</span>\n'+
                            '<p class="book-descr">'+(el.description?el.description:'No description')+'</p></li>'+'\n';
                    };
                    return list;
                },'');
            };
            return listItems;
        }
    },
    booksStr = JSON.stringify(books),
    booksJSON = JSON.parse(booksStr);

/*console.log(booksStr);
console.log(booksJSON);*/

document.querySelector('.bookslist').innerHTML = '<ul>'+app.iterateJSON(booksJSON)+'</ul>';