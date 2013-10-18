var pg = require('pg')
    ,wordsEngine = require(process.cwd() + '/engine/words.js')
    ,async = require('async');



module.exports = {

    // init
    $init : function(server, Hapi){


    },
    // get Hapi Config
    $getConfig : function(){
        return {

        }
    },
    index_get : function (request){


        //console.log(request.getParam('l2'));
        wordsEngine.getWordsWithImages(pgclient, ['cs', 'en'], 1, function(err, words){
            request.reply(err ? err : words);
        });
    },
    lesson_get : function (request){
        //console.log(request.getParam('l2'));
        //  http://localhost:8080/words/lesson/2/de/cs
        if(request.params.params && request.params.params.length > 0){
            var langs = request.params.params.split('/');
            var lesson = langs.shift();

            console.log(langs);
            console.log(lesson);

            wordsEngine.getWordsWithImages(pgclient, langs, lesson, function(err, words){
                request.reply(err ? err : words);
            });
        } else {
            request.reply('format : /lesson/lang1/lang2/{lang3?}');
        }
    }


//    ,wordsControler : function(){
//      function getWord(lang1, lang2, cb){
//          var sql = 'SELECT word.word as word1cs, w2.word as word2en, word.lang, w2.lang, image.image from word ' +
//              + ' LEFT JOIN word w2 on word.link = w2.link ' +
//              + ' LEFT JOIN image on word.link=image.link ' +
//              +' WHERE word.lang= $1 AND w2.lang= $2 ' +
//              +' AND word.link > 10 AND word.link < 20';
//
//          //console.log(sql)  ;
//          pgclient.query(sql, [lang1, lang2], function(err, data){
//              //console.log(data);
//              cb(err, {words: data.rows});
//
//          });
//      }
//    }

}