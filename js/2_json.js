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
            "title": "Necronomicon: the Book of Grim Rituals",
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
            "description": "During the reign of Catherine the Great, the young Grinev sets out for his new career in the army and en route performs an act of kindness by giving his warm coat to a man freezing in a blizzard. This action reaps its reward when he subsequently finds himself caught up in the rebellion headed by the infamous, and strangely familiar, Pugachev. Rivalry with a fellow officer for the affections of Captain Mironov's daughter further complicates Grinev's affairs, and ultimately it is only an appeal by Masha Mironova, the eponymous captain's daughter, to the Empress herself that can unravel a tangled web."
        },
        {
            "title": "The Holy Quran",
            "author": "",
            "description": "Great philosophy, corrupted by extrimists in our days."
        },
        {
            "title": "How to Draw Things",
            "author": "Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso",
            "description": "Actually, this book doesn't exists :)"
        }
    ],

    printer = {
        elName: null,
        booksList: null,
        truncStr: function(str,lng) {
            if (str.length>lng) {
                str = str.slice(0,lng) + '&hellip;';
                return str;
            } else
                return str;
        },
        isObject: function (o) {
            if (typeof o == 'object') {
                if ( (o instanceof Array)||(o == null) ) {
                    return false;
                } else {
                    return true;
                };
            } else
                return false;
        },
        loadList: function(json){ //passed string parsed to JSON object and stored to inner var.
            this.booksList = JSON.parse(json);
        },
        printRecord: function(el){
            var df = document.createDocumentFragment(),
                rec, title, author, descr;
            if (this.isObject(el)&&(el.title !== '')) {
                rec = document.createElement('li'),
                title = document.createElement('span');
                author = document.createElement('span');  //clone не работает!
                descr = document.createElement('p');

                console.log(el.title);
                console.log(el.author);
                console.log(el.descr);

                title.innerHTML = this.truncStr(el.title,25);
                author.innerHTML = this.truncStr(el.author,25);
                descr.innerHTML = this.truncStr(el.description,150);

                title.classList.add('book-title');
                author.classList.add('book-author');
                descr.classList.add('book-descr');
                rec.classList.add('book', 'cf');

                rec.appendChild(title);
                rec.appendChild(author);
                rec.appendChild(descr);
                df.appendChild(rec);

                return df;
            } else
                return false;
        },
        formList: function() {
            var list = document.createDocumentFragment();
            this.booksList.forEach(function(el) {
                var record = this.printRecord(el);
                if (record) {
                    list.appendChild(record);
                }
            }, this);
            return list;
        },
        sendToDOM: function(node){
            var where = this.elName;
            if (node instanceof Node) {
                where.appendChild(node);
            }
        },
        renderToDOM: function() {
            if (this.booksList !== null) {
                this.sendToDOM(this.formList());
                return true;
            } else {
                console.log('booksList is empty');
                return false;
            }
        }
    },

    booksStr = JSON.stringify(books);

//------------
printer.elName = document.querySelector('.bookslist');
printer.loadList(booksStr);
printer.renderToDOM();