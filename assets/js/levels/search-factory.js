/**
 * Created by miuan on 7/10/14.
 */
(function() {
    'use strict';
    var amod = angular.module('milan.levels.search.factory',['ngRoute', 'milan.levels.links.factory']);

    amod.factory('searchFactory', function($http, linksFactory) {
        var self = {};
        var __foundWords = {}

        function __setupFoundedWord(foundWords, word){
            var countFoundedWords = 0;

            //resultList.push(__foundWords[word.simple]);
            // if is not founded the found words is empty or null
            if(foundWords && foundWords.length > 0){
                word.link = foundWords[0].lid;
                word.possible = foundWords;
                countFoundedWords = foundWords.length;
            } else {
                word.possible = null;
            }

            return countFoundedWords;
        }



        /**
         *
         * @param lang - lang for search
         * @param words
         * @param lang2 {String} optional lang for result of words (current.language)
         * @param cb
         * @param reverse {Boolean} read
         * @private
         */
        self.__search = function(lang, words, lang2, cb, properly){

            // classic if the lang2 is not use
            if(!cb){
                cb = lang2;
                lang2 = 'en';
            }


            // first search for this language
            if(!__foundWords[lang]) {
                __foundWords[lang] = {};
            }

            var workList = [];
            var workListLinearForSearch = [];
            var resultList = [];

            // how much words was founded
            var resCount = 0;
            words.forEach(function(word){
                // foundwords contain already searched words
                if(__foundWords[word.simple]){
                    resCount += __setupFoundedWord(__foundWords[word.simple], word);
                } else {
                    // the word is not in found list
                    // if is the same word in list, don't search again
                    // just add link to another word
                    if(workList[word.simple]){
                        // add word to worklist
                        // the word is already in search list
                        workList[word.simple].push(word)
                    } else {
                        workList[word.simple] = [word]
                        // add workList to searchlist
                        workListLinearForSearch.push(workList[word.simple]);
                    }

                }

            });


            if(workListLinearForSearch && workListLinearForSearch.length > 0){
                var wordString = '';
                workListLinearForSearch.forEach(function(wl){
                    wordString += ',' + wl[0].simple;
                });
                wordString = wordString.substring(1);

                var fixlang = lang != 'cz' ? lang : 'cs';
                var fixlang2 = lang2 != 'cz' ? lang2 : 'cs';
                var url = '/words/search/'+fixlang+'/'+fixlang2+'/?fields=lid,desc,word,word2,english&words='+wordString;

                if(properly){
                    url += '&properly=true';
                }

                requestGET($http, url, function(response, status){
                    console.log(response);



                    response.forEach(function(foundedWords, idx){
                        var wl = workListLinearForSearch[idx];
                        __foundWords[wl[0].simple] = foundedWords;
                        wl.forEach(function(word){
                            resCount += __setupFoundedWord(foundedWords, word);
                        })

                        // update links factory for next load
                        // foundedWords have more links
                        foundedWords.forEach(function(fw){
                            linksFactory.update(lang, fw);
                        })
                    });


                    cb(resCount);
                });
            } else {
                cb(resCount);
            }

        }



        return {
            search : self.__search

        };
    });
}).call(this);