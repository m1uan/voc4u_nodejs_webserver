var assert = require("assert"),
    question = require('../../engine/question.js'),
    words = require('../../engine/words.js'),
    pg = require('pg'),
    should = require('should')
    , Async = require('async')
    ,config = require('../../config/local.js')
    ,fs = require('fs');

var pgClient = null;

var sqlMake = require('../../lib/helps/helps.js').sqlMake;

var inDir = '/tmp/tes3x/';
var inDirLang = inDir + 'lang/';
var inDirImg = inDir + 'img/';

describe('package operations', function(){

    before(function(cb){
        var dbuser = config.DB_USER_TEST;
        var dbpass = config.DB_PASS_TEST;
        var dbname = config.DB_NAME_TEST;
        var connection = 'postgres://'+dbuser+':'+dbpass+'@localhost/' + dbname;
        pgClient = new pg.Client(connection);

        pgClient.connect(function(err){
            if(err){
                return console.info('could not connect to postgres', err);
            }

            sqlMake(pgClient, [
                "SELECT remove_test_data();" ,
                "select create_test_data();"
                //, "SELECT generate_langs();"
                //, "SELECT remove_test_data();"


            ],cb);

        });
    });

    after(function(cb){

        sqlMake(pgClient, [
            "SELECT remove_test_data();"  ,
            //"delete from question_message_t;",
            "delete from question_t;"
        ],cb);
    });


    describe('questions', function(){
        it('without message', function(cb){
            var questionData = {
                userId : 3,
                linkId: 1431,
                lang1 : 'cs'
                ,lang2 : 'en'
                //, message :  'i dont understand meaning on this word'
            } ;
            question.changeStatus(pgClient, questionData, function(err, data){
                console.log(err ? err : data);
                assert(data);
                /*{
                 status : statusLink.status,
                 link : statusLink.link,
                 message : message.message,
                 user : message.usr,
                 changed : message.changed
                 }*/
                data.should.have.property('link');
                data.should.have.property('status');
                data.should.have.property('message');
                data.should.have.property('user');
                data.should.have.property('changed');
                pgClient.query('SELECT message FROM question_t WHERE link=$1 AND usr=$2 AND lang1=$3 AND lang2=$4',
                    [questionData.linkId, questionData.userId, questionData.lang1, questionData.lang2],
                    function(err, td){
                        console.log(err ? err : td);
                        td.rows.should.be.a.Array;
                        td.rows.length.should.eql(1);
                        var r0 = td.rows[0];
                        r0.message.should.be.eql('*note: set STATUS to: 1');
                        cb();
                    });

            })


        });


        it('with message', function(cb){
            var questionData = {
                userId : 3,
                linkId: 1432,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'i dont understand meaning on this word'
            } ;
            question.changeStatus(pgClient, questionData, function(errw, dataw){
            question.changeStatus(pgClient, questionData, function(errw, dataw){
            question.changeStatus(pgClient, questionData, function(err, data){
                console.log(err ? err : data);
                assert(data);
                /*{
                 status : statusLink.status,
                 link : statusLink.link,
                 message : message.message,
                 user : message.usr,
                 changed : message.changed
                 }*/
                data.should.have.property('link');
                data.should.have.property('status');
                data.should.have.property('message');
                data.should.have.property('user');
                data.should.have.property('changed');
                pgClient.query('SELECT message FROM question_t WHERE link=$1 AND usr=$2 AND lang1=$3 AND lang2=$4',
                    [questionData.linkId, questionData.userId, questionData.lang1, questionData.lang2],
                    function(err, td){
                        console.log(err ? err : td);
                        td.rows.should.be.a.Array;
                        td.rows.length.should.eql(1);
                        var r0 = td.rows[0];
                        r0.message.should.be.eql('i dont understand meaning on this word');
                        pgClient.query('SELECT status FROM question_status_t WHERE link=$1',
                            [questionData.linkId],
                            function(errqs, qs){
                                console.log(errqs ? errqs : qs);
                                qs.rows.length.should.eql(1) ;
                                cb();
                            });
                    });

            })
            });
            });
        });

        it('get messages', function(cb){
            var questionData = {
                userId : 3,
                linkId: 1432,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message1'
            } ;
            var questionData2 = {
                userId : 3,
                linkId: 1433,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message2'
            } ;

            var questionData3 = {
                userId : 4,
                linkId: 1433,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message3'
            } ;
            question.changeStatus(pgClient, questionData, function(errw, dataw){
            question.changeStatus(pgClient, questionData2, function(err, data){
            question.changeStatus(pgClient, questionData3, function(err, data){
                question.get(pgClient, [1432,1433], ['message'], function(errw, dataw){
                    console.log(err, dataw)   ;

                    dataw.should.be.Array;
                    dataw[0].linkId.should.eql(1432);
                    dataw[0].messages.should.be.Array;
                    dataw[0].messages.length.should.eql(1);
                    dataw[0].messages[0].message.should.eql('message1');

                    dataw[1].linkId.should.eql(1433);
                    dataw[1].messages.should.be.Array;
                    dataw[1].messages.length.should.eql(2);
                    dataw[1].messages[1].message.should.eql('message2');
                    dataw[1].messages[0].message.should.eql('message3');

                    cb();
                });
            })})});
        });


    });
    describe('last visit', function(){

        beforeEach(function(cb){

            sqlMake(pgClient, [
                "delete from last_visit_t;",
                "delete from question_t;"
            ],cb);
        });

        it('get messages', function(cb){
            var lastVisitData = {
                type: question.LAST_VISIT_QUESTION,
                usr: 3
            };
            var before = new Date();
            //console.log('working?');
            question.lastVisit(pgClient, lastVisitData, function(err, data){
                console.log(err ? err : data);
                pgClient.query('SELECT * FROM last_visit_t WHERE type=$1 AND usr=$2',
                    [lastVisitData.type, lastVisitData.usr],
                    function(errqs, qs){
                        console.log(errqs ? errqs : qs);
                        qs.rows.length.should.eql(1) ;
                        qs.rows[0].datetime.should.be.above(before);
                        cb();
                    });

            });
        });

        it('first time', function(cb){
            var lastVisitData = {
                type: question.LAST_VISIT_QUESTION,
                usr: 3
            };
            var before = new Date(0);
            //console.log('working?');
            var questionData = {
                userId : 3,
                linkId: 1433,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message3'
            } ;
            question.changeStatus(pgClient, questionData, function(errw, dataw){
            //question.lastVisit(pgClient, lastVisitData, function(err, data){
            question.countChangesFromLastVisit(pgClient, lastVisitData, function(err, data){
                console.log(err ? err : data);
                data.should.have.a.property('lastVisit');
                data.lastVisit.should.be.eql(before);
                data.should.have.a.property('cnt');
                data.cnt.should.have.be.eql(0);
                cb();

            });});
        });

        it('already visit', function(cb){
            var lastVisitData = {
                type: question.LAST_VISIT_QUESTION,
                usr: 3
            };
            var before = new Date(0);
            //console.log('working?');
            var questionData = {
                userId : 3,
                linkId: 1433,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message3'
            } ;

            var questionData1 = {
                userId : 4,
                linkId: 1432,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message 1'
            } ;



            question.lastVisit(pgClient, lastVisitData, function(err, data){
            question.changeStatus(pgClient, questionData1, function(errw, dataw){
            question.changeStatus(pgClient, questionData, function(errw, dataw){
                //
                question.countChangesFromLastVisit(pgClient, lastVisitData, function(err, data){
                    console.log(err ? err : data);
                    data.should.have.a.property('lastVisit');
                    data.lastVisit.should.be.above(before);
                    data.should.have.a.property('cnt');
                    data.cnt.should.have.be.eql(1);
                    cb();

                });});});});
        });

        it('my question', function(cb){
            var lastVisitData = {
                type: question.LAST_VISIT_MY_QUESTION,
                usr: 3
            };
            var before = new Date(0);
            //console.log('working?');
            var questionData = {
                userId : 3,
                linkId: 1433,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message3'
            } ;

            var questionData1 = {
                userId : 4,
                linkId: 1433,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message 1'
            } ;
            var questionData2 = {
                userId : 4,
                linkId: 1435,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message 2'
            } ;

            var questionData3 = {
                userId : 3,
                linkId: 1432,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message 3'
            } ;

            var questionData4 = {
                userId : 4,
                linkId: 1432,
                lang1 : 'cs'
                ,lang2 : 'en'
                , message :  'message 4'
            } ;

            question.lastVisit(pgClient, lastVisitData, function(err, data){
            question.changeStatus(pgClient, questionData1, function(errw, dataw){
            question.changeStatus(pgClient, questionData2, function(errw, dataw){
            question.changeStatus(pgClient, questionData3, function(errw, dataw){
            question.changeStatus(pgClient, questionData4, function(errw, dataw){
            question.changeStatus(pgClient, questionData, function(errw, dataw){
                        //
                        question.countChangesFromLastVisit(pgClient, lastVisitData, function(err, data){
                            console.log(err ? err : data);
                            data.should.have.a.property('lastVisit');
                            data.lastVisit.should.be.above(before);
                            data.should.have.a.property('cnt');
                            data.cnt.should.have.be.eql(2);
                            cb();

                        });});});});});})});
        });
    })

})