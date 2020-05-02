var assert = require('assert');
var multi = require('../index');
describe('Comisiones', function() {

  describe('Caso Comision 1 se suma $10000 a N1-D', function() {
    var t = new multi.Tree();
    before(function() {
        //building tree
        t.add(100,'N5');
        t.add(120,'N4');
        t.add(110,'N3-I');
        t.add(130,'N3-D');
        t.add(150,'N2');
        t.add(140,'N1-I');
        t.add(160,'N1-D');
        //add commission to N1-D
        t.addSales(160,10000);
      });

    it('N1-D recibe el 3% de $10000 = 300', function() {
    assert.equal(t.commissionRequest(160), 300.00);
    });
    it('N2 recibe el 1.2% de $10000 = 120', function() {
      assert.equal(t.commissionRequest(150), 120.00);
    });
    it('N3-D recibe el 0.12% de $10000 = 12', function() {
        assert.equal(t.commissionRequest(130), 12.00);
    });
    it('N4 recibe el 0.08% de $10000 = 8', function() {
    assert.equal(t.commissionRequest(120), 8.00);
    });
    it('N5 recibe el 0.05% de $10000 = 6', function() {
    assert.equal(t.commissionRequest(100), 6.00);
    });
    
  });
});
describe('Bonus', function() {
    var t = new multi.Tree();
      before(function() {
          //building tree
          t.add(100,'N5');
          t.add(120,'N4');
          t.add(110,'N3-I');
          t.add(130,'N3-D');
          t.add(150,'N2');
          t.add(140,'N1-I');
          t.add(160,'N1-D');
          //add commission to N1-D
          t.addSales(160,5000,1);
          t.addSales(140,12000);
          t.addSales(150,14000);
          t.addSales(130,16000);
          t.addSales(110,18000);
          t.addSales(120,20000);
          t.addSales(100,25000);
        });

    describe('Se prueba suma de los equipos', function() {
      
  
      it('La suma del equipo de N2 deberia dar 31000', function() {
      assert.equal(t.teamSales(150), 31000.00);
      });
      it('La suma del equipo de N3-D deberia dar 47000', function() {
        assert.equal(t.teamSales(130), 47000.00);
      });
      it('La suma del equipo de N4-D deberia dar 85000', function() {
        assert.equal(t.teamSales(120), 85000.00);
      });
      it('La suma del equipo de N5 deberia dar 110000', function() {
        assert.equal(t.teamSales(100), 110000.00);
      });
      it('La suma del equipo de N3-I deberia dar 18000', function() {
        assert.equal(t.teamSales(110), 18000.00);
      });
      
      
    });
    describe('Se verifica los bonus meta propia', function() {
        it('N1-D $5000 bonus de $150', function() {
        assert.equal(t.find(160).bonus.own, 150.00);
        });
        it('N1-I $10000 bonus de $200', function() {
            assert.equal(t.find(140).bonus.own, 200.00);
        });
        it('N3-D $15000 bonus de $300', function() {
            assert.equal(t.find(130).bonus.own, 300.00);
        });
        it('N5 $25000 bonus de $400', function() {
            assert.equal(t.find(100).bonus.own, 400.00);
        });
      });
      describe('Se verifica los bonus primera quincena', function() {
        it('N1-D $5000 bonus de $100', function() {
        assert.equal(t.find(160).bonus.fortnight, 100.00);
        });
      });
  });

  describe('Bonus 2', function() {
    var t = new multi.Tree();
      before(function() {
          //building tree
          t.add(100,'N5');
          t.add(120,'N4');
          t.add(110,'N3-I');
          t.add(130,'N3-D');
          t.add(150,'N2');
          t.add(140,'N1-I');
          t.add(160,'N1-D');
          //add commission to N1-D
          t.addSales(160,5000,1);
          t.addSales(140,12000);
          t.addSales(150,14000);
          t.addSales(130,16000);
          t.addSales(110,12000);
          t.addSales(120,20000);
          t.addSales(100,25000);
        });

        describe('Se prueba suma de los equipos', function() {
      
  
            it('La suma del equipo de N2 deberia dar 31000', function() {
            assert.equal(t.teamSales(150), 31000.00);
            });
            it('La suma del equipo de N3-D deberia dar 47000', function() {
              assert.equal(t.teamSales(130), 47000.00);
            });
            it('La suma del equipo de N4-D deberia dar 79000', function() {
              assert.equal(t.teamSales(120), 79000.00);
            });
            it('La suma del equipo de N5 deberia dar 104000', function() {
              assert.equal(t.teamSales(100), 104000.00);
            });
            it('La suma del equipo de N3-I deberia dar 12000', function() {
              assert.equal(t.teamSales(110), 12000.00);
            });
            
            
          });

      describe('Se verifica los bonus de liderazgo', function() {
          
        it('N2 $20000 bonus de $150', function() {
        assert.equal(t.find(150).bonus.leadership, 150.00);
        });
        it('N3-D $40000 bonus de $250', function() {
            assert.equal(t.find(130).bonus.leadership, 250.00);
        });
        it('N4 $60000 bonus de $350', function() {
            assert.equal(t.find(120).bonus.leadership, 350.00);
        });
        it('N5 $80000 bonus de $500', function() {
            assert.equal(t.find(100).bonus.leadership, 500.00);
        });
            
      });
  });


  describe('Bonus 3', function() {
    var t = new multi.Tree();
      before(function() {
          //building tree
          t.add(100,'N5');
          t.add(120,'N4');
          t.add(110,'N3-I');
          t.add(130,'N3-D');
          t.add(150,'N2');
          t.add(140,'N1-I');
          t.add(160,'N1-D');
          //add commission to N1-D
          t.addSales(160,12000,1);
          t.addSales(140,16000);
          t.addSales(150,18000);
          t.addSales(130,20000);
          t.addSales(110,12000);
          t.addSales(120,20000);
          t.addSales(100,25000);
          //add record Sales
          t.addSalesRecord(160,11000,13000);
          t.addSalesRecord(140,14000,18000);
          t.addSalesRecord(150,17000,19000);
          t.addSalesRecord(130,19000,21000);
          t.addSalesRecord(110,10000,14000);
          t.addSalesRecord(120,18000,22000);
          t.addSalesRecord(100,24000,26000);
        });

        describe('Se prueba suma  promedio de los equipos por trimestre', function() {
      
  
            it('La suma del equipo de N2 deberia dar 46000', function() {
            assert.equal(t.teamSalesQuarter(150), 46000.00);
            });
            it('La suma del equipo de N3-D deberia dar 66000', function() {
              assert.equal(t.teamSalesQuarter(130), 66000.00);
            });
            it('La suma del equipo de N4-D deberia dar 98000', function() {
              assert.equal(t.teamSalesQuarter(120), 98000.00);
            });
            it('La suma del equipo de N5 deberia dar 123000', function() {
              assert.equal(t.teamSalesQuarter(100), 123000.00);
            });
            it('La suma del equipo de N3-I deberia dar 12000', function() {
              assert.equal(t.teamSalesQuarter(110), 12000.00);
            });
            
            
          });

      describe('Se verifica los bonus de trimestre', function() {
          
        it('N2 $45000 bonus de $350', function() {
        assert.equal(t.find(150).bonus.quarterly, 350.00);
        });
        it('N3-D $65000 bonus de $500', function() {
            assert.equal(t.find(130).bonus.quarterly, 500.00);
        });
        it('N4 $85000 bonus de $650', function() {
            assert.equal(t.find(120).bonus.quarterly, 650.00);
        });
        it('N5 $100000 bonus de $1000', function() {
            assert.equal(t.find(100).bonus.quarterly, 1000.00);
        });
            
      });
  });

  describe('Testricciones de Comision', function() {
    var t = new multi.Tree();
      before(function() {
          //building tree
          t.add(100,'N5');
          t.add(120,'N4');
          t.add(110,'N3-I');
          t.add(130,'N3-D');
          t.add(150,'N2');
          t.add(140,'N1-I');
          t.add(160,'N1-D');
          //add commission to N1-D
          t.addSales(160,12000,1);
          t.addSales(140,16000);
          t.addSales(150,18000);
          t.addSales(130,20000);
          t.addSales(110,40000);
          t.addSales(120,20000);
          t.addSales(100,205000);
          //add record Sales
          t.addSalesRecord(160,11000,13000);
          t.addSalesRecord(140,14000,18000);
          t.addSalesRecord(150,17000,19000);
          t.addSalesRecord(130,19000,21000);
          t.addSalesRecord(110,10000,14000);
          t.addSalesRecord(120,18000,22000);
          t.addSalesRecord(100,24000,26000);
        });

        describe('Se prueba suma de los equipos', function() {
      
  
            it('La suma del equipo de N2 deberia dar 46000', function() {
            assert.equal(t.teamSales(150), 46000.00);
            });
            it('La suma del equipo de N3-D deberia dar 66000', function() {
              assert.equal(t.teamSales(130), 66000.00);
            });
            it('La suma del equipo de N4-D deberia dar 126000', function() {
              assert.equal(t.teamSales(120), 126000.00);
            });
            it('La suma del equipo de N5 deberia dar 331000', function() {
              assert.equal(t.teamSales(100), 331000.00);
            });
            it('La suma del equipo de N3-I deberia dar 12000', function() {
              assert.equal(t.teamSales(110), 40000.00);
            });
            
            
          });

        describe('Se prueba suma  promedio de los equipos por trimestre', function() {
      
            it('Las comisiones de N1 = 360', function() {
                assert.equal(t.find(160).commission.N1, 360.00);
                });
            it('Las comisiones de N2 = 144', function() {
                assert.equal(t.find(150).commission.N2, 144.00);
                });
            it('Las comisiones de N3 = 14.4', function() {
                assert.equal(t.find(130).commission.N3, 14.40);
                });
            it('Las comisiones de N4 = 9.6', function() {
                assert.equal(t.find(120).commission.N4, 9.60);
                });
            it('Las comisiones de N5 = 7.2 ', function() {
                assert.equal(t.find(100).commission.N5, 7.20);
                });
            
            
          });

      
  });