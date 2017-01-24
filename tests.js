/**
 * Created by ismar on 24/01/2017.
 */

QUnit.test( "SUM", function( assert ) {

    CPU._init();
    //Sum a and e
    CPU._r.a = 5;
    CPU._r.e = 3;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0
    };
    CPU.add_A_r(inst);
    assert.ok( CPU._r.a == 8, "Passed!" );
});
QUnit.test( "SUM with overflow", function( assert ) {

    CPU._init();
    //Sum a and e
    CPU._r.a = 255;
    CPU._r.e = 2;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n:0
    };
    CPU.add_A_r(inst);

    assert.equal( CPU._r.a , 0x01,"Result is correct");
    assert.equal(CPU._r.f&0x10, 0x10,"C flag activated")
});
QUnit.test( "SUM with half-overflow", function( assert ) {

    CPU._init();
    //Sum a and e
    CPU._r.a = 0xF;
    CPU._r.e = 0x1;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n:0
    };

    CPU.add_A_r(inst);

    //assert.equal( CPU._r.a , 0x01,"Result is correct");
    assert.equal(CPU._r.f, 0x20,"H flag activated")
});

QUnit.test( "SUM_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xFF;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0xA
    };

    CPU.add_A_n(inst);

    assert.equal(CPU._r.a, 0x9,"Result is correct");
    assert.equal(CPU._r.f, 0x30, "H and C flags are set");


});


QUnit.test( "ADD_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xFF;
    CPU._r.h = 0x00;
    CPU._r.l = 0xA;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x0,
        n: 0x0
    };

    CPU.add_A_HL(inst);

    assert.equal(CPU._r.a, 0x9,"Result is correct");
    assert.equal(CPU._r.f, 0x30, "H and C flags are set");


});


QUnit.test( "ADDC_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xE1;
    CPU._r.e = 0x0F;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x1, //To indicate that has carry
        r2: 0x03, //To indicate register E
        n: 0x00
    };

    CPU.add_A_r(inst);

    assert.equal(CPU._r.a, 0xF1,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");



});

QUnit.test( "ADDC_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xE1;
    CPU._r.h = 0x00;
    CPU._r.l = 0x1E;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x1,
        r2: 0x0,
        n: 0x3B
    };

    CPU.add_A_n(inst);

    assert.equal(CPU._r.a, 0x1D,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");



});

QUnit.test( "ADDC_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0xE1;
    CPU._r.h = 0x00;
    CPU._r.l = 0x1E;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x1,
        r2: 0x0,
        n: 0x0
    };

    CPU.add_A_HL(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "SUB_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3E;
    CPU._r.e = 0x3E;
    CPU._r.h = 0x00;
    CPU._r.l = 0x40;
    //CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x0
    };

    CPU.sub_A_r(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "SUB_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3E;
    CPU._r.e = 0x3E;
    CPU._r.h = 0x00;
    CPU._r.l = 0x40;
    //CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x0F
    };

    CPU.sub_A_n(inst);

    assert.equal(CPU._r.a, 0x2F,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "SUB_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3E;
    CPU._r.e = 0x3E;
    CPU._r.h = 0x00;
    CPU._r.l = 0x40;
    //CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x0F
    };

    CPU.sub_A_HL(inst);

    assert.equal(CPU._r.a, 0xFE,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "SUBC_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3B;
    CPU._r.e = 0x2A;
    CPU._r.h = 0x00;
    CPU._r.l = 0x4F;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x3,
        r2: 0x3,
        n: 0x3A
    };

    CPU.sub_A_r(inst);

    assert.equal(CPU._r.a, 0x10,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "SUBC_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3B;
    CPU._r.e = 0x2A;
    CPU._r.h = 0x00;
    CPU._r.l = 0x4F;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x3,
        r2: 0x3,
        n: 0x3A
    };

    CPU.sub_A_n(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x00,"H flag is set to 0");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "SUBC_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x3B;
    CPU._r.e = 0x2A;
    CPU._r.h = 0x00;
    CPU._r.l = 0x4F;
    CPU._r.f = 0x10;

    var inst = {
        opcode: 0x2,
        r1: 0x3,
        r2: 0x3,
        n: 0x3A
    };

    CPU.sub_A_HL(inst);

    assert.equal(CPU._r.a, 0xEB,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x40,"N flag is set to 1");
    assert.equal(CPU._r.f&0x10,0x10,"C flag is set to 1");


});

QUnit.test( "AND_A_r", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x5A;
    CPU._r.e = 0x3F;
    CPU._r.h = 0x00;
    CPU._r.l = 0x00;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x38
    };

    CPU.and_A_r(inst);

    assert.equal(CPU._r.a, 0x1A,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "AND_A_n", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x5A;
    CPU._r.e = 0x3F;
    CPU._r.h = 0x00;
    CPU._r.l = 0x00;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x38
    };

    CPU.and_A_n(inst);

    assert.equal(CPU._r.a, 0x18,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x00, "Z flag is set to 0");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});

QUnit.test( "AND_A_HL", function( assert ) {

    CPU._init();

    //Sum a and e
    CPU._r.a = 0x5A;
    CPU._r.e = 0x3F;
    CPU._r.h = 0x00;
    CPU._r.l = 0x00;

    var inst = {
        opcode: 0x2,
        r1: 0x0,
        r2: 0x3,
        n: 0x38
    };

    CPU.and_A_HL(inst);

    assert.equal(CPU._r.a, 0x00,"Result is correct");
    assert.equal(CPU._r.f&0x80, 0x80, "Z flag is set to 1");
    assert.equal(CPU._r.f&0x20,0x20,"H flag is set to 1");
    assert.equal(CPU._r.f&0x40,0x00,"N flag is set to 0");
    assert.equal(CPU._r.f&0x10,0x00,"C flag is set to 0");


});


//Todo: sure the H flag is right?