/**
 * Fabian Quirola
 * 
 * Ejercicio de consulta comisiones y bonos multinivel
 *
 * @class Node
 */
class Node {
  constructor(key,name) {
    this.key = key
    this.name = name
    this.sales = 0
    this.sales1 = 0
    this.sales2 = 0
    this.right = null
    this.left = null
    this.bonus = { 
      own : 0,
      fortnight : 0,
      leadership : 0,
      quarterly : 0
      
    }
  }
}

class Tree {
  constructor() {
    this.root = null
  }

  isEmpty() {
    return this.root === null
  }

  add(key,name) {
    // arbol no tiene elementos
    if (this.isEmpty()) {
      this.root = new Node(key,name)
      return
    }

    var aux = this.root

    while (aux) {
      // vamos hacia la izquierda
      if (key < aux.key) {
        if (aux.left) {
          aux = aux.left
        } else {
          aux.left = new Node(key,name)
          return
        }
      } else {
        // vamos hacia la derecha
        if (aux.right) {
          aux = aux.right
        } else {
          aux.right = new Node(key,name)
          return
        }
      }
    }
  }


  addRecursive(key, node = this.root) {
    if (!node) {
      this.root = new Node(key)
      return
    }

    if (key < node.key) {
      if (node.left) {
        return this.addRecursive(key, node.left)
      }
      node.left = new Node(key)
      return
    } else {
      // vamos hacia la derecha
      if (node.right) {
        return this.addRecursive(key, node.right)
      }
      node.right = new Node(key)
      return
    }
  }

  find(key) {
    if (this.isEmpty()) {
      return null
    }

    var aux = this.root
    if (aux.key === key) {
      return aux
    }

    while (aux) {
      // si encontramos el nodo con el valor
      // paramos de iterar.
      if (aux.key === key) {
        break
      }
      // seguimos buscando a la derecha
      if (aux.key < key) {
        aux = aux.right
      } else if (aux.key > key) {
        // seguimos buscando a la izquierda
        aux = aux.left
      }
    }
    // retornamos el nodo encontrado.
    // si no encontramos el nodo con el valor
    // aux, toma el valor null.
    return aux
  }

  findRecursive(key, node = this.root) {
    if (node.key === key) {
      return node
    }

    if (node.key < key) {
      return this.findRecursive(key, node.right)
    } else if (node.key > key) {
      return this.findRecursive(key, node.left)
    }
  }

  delete(key, node = this.root) {
    if (!node) {
      return null
    }
    if (node.key === key) {
      // no tiene hijos
      if (!node.left && !node.right) {
        return null
      }
      // no tiene hijo izquierdo
      if (!node.left) {
        return node.right
      }
      // no tiene hijo derecho
      if (!node.right) {
        return node.left
      }

      // tiene dos hijos
      // buscamos el menor de los hijos
      var temp = this.findMin(node.right)
      // con ese valor reemplazamos el valor del nodo que queremos eliminar.
      node.key = temp.key
      // seguimos iterando para reemplazar la rama que cambio,
      // eliminando el nodo que está repetido
      node.right = this.delete(temp.key, node.right)
      return node
    }
    // buscamos a la derecha
    if (node.key < key) {
      node.right = this.delete(key, node.right)
      return node
    }
    // buscamos a la izquierda
    if (node.key > key) {
      node.left = this.delete(key, node.left)
      return node
    }
  }
  print(node = this.root) {
    if (!node) {
      return
    }
    this.print(node.left)
    console.log(node.key)
    this.print(node.right)
  }

  addSales(key,amount,firstFortnight = 0){
    var node = this.find(key);
    node.sales += amount;
    
    /**
     * Si la persona vende $5,000 recibe $150
     * Si la persona vende $10,000 recibe $200 
     * Si la persona vende $15,000 recibe $300  
     * Si la persona vende $25,000 recibe $400   
     * <>
     * */

    // Bonus Meta Propia
    if(amount>= 5000 && amount < 10000){
      node.bonus.own += 150;
    }
    if(amount>= 10000 && amount < 15000){
    node.bonus.own += 200;
    }
    if(amount>= 15000 && amount < 25000){
      node.bonus.own += 300;
    }
    if(amount  >= 25000){
      node.bonus.own += 400;
    }


    // Bonus primera Quincena
    if(amount>= 5000 && firstFortnight === 1){
      node.bonus.fortnight += 100;
    }

    /**
     * Bono de liderazgo (aplica max uno)
      Si el equipo, incluyendo al líder vende $20,000 en el mes recibe $150
      Si el equipo, incluyendo al líder vende $40,000 en el mes recibe $250
      Si el equipo, incluyendo al líder vende $60,000 en el mes recibe $350
      Si el equipo, incluyendo al líder vende $80,000 en el mes recibe $500
        
      */
    var salesTeam= this.teamSalesByNode(node);

     if(salesTeam>= 20000 && salesTeam < 40000){
      node.bonus.leadership += 150;
    }
    if(salesTeam>= 40000 && salesTeam < 60000){
    node.bonus.leadership += 250;
    }
    if(salesTeam>= 60000 && salesTeam < 80000){
      node.bonus.leadership += 350;
    }
    if(salesTeam  >= 80000){
      node.bonus.leadership += 500;
    }


/*
Bono trimestral(aplica max uno) 
Si el equipo, incluyendo al líder vende $45,000 o más por tres meses consecutivos recibe $350
Si el equipo, incluyendo al líder vende $65,000 o más por tres meses consecutivos recibe $500
Si el equipo, incluyendo al líder vende $85,000 o más por tres meses consecutivos recibe $650
Si el equipo, incluyendo al líder vende $100,000 o más por tres meses consecutivos recibe $1000   
     */

    var salesTeamQuarterRecord = this.teamSalesQuarterByNode(node);
    //console.log(salesTeamQuarterRecord);
    if(salesTeamQuarterRecord >= 45000 && salesTeamQuarterRecord < 65000){
     node.bonus.quarterly += 350;
   }
   if(salesTeamQuarterRecord >= 65000 && salesTeamQuarterRecord < 85000){
   node.bonus.quarterly += 500;
   }
   if(salesTeamQuarterRecord >= 85000 && salesTeamQuarterRecord < 100000){
     node.bonus.quarterly += 650;
   }
   if(salesTeamQuarterRecord  >= 100000){
     node.bonus.quarterly += 1000;
   }

    return 'Sales of '+node.name+' = $'+node.sales;
  }

  addSalesRecord(key,amount1,amount2){
    var node = this.find(key);
    node.sales1 += amount1;
    node.sales2 += amount2;
    
    return 'Sales1 and Sales2 of '+node.name+' = $'+node.sales1+'$'+node.sales2;
  }
  
  commissionRequest(key){

    var node = this.find(key);
    var commission = 0;
  
    var percent = [0.03,0.012,0.0012,0.0008,0.0006];

    var i = 0;
 
    function sumLevel(node) {
      if (!node || i > percent.length - 1) {
        return
      }
      commission += (node.sales * percent[i]); 
      i++;
      sumLevel(node.right)
      sumLevel(node.left)
      
    }
    
    sumLevel(node);
  
    //return 'Commission of '+node.name+' = $'+commission.toFixed(2);
    
    return commission.toFixed(2);
    
  }

  teamSales(key){
    
    var node = this.find(key);
    //var bonus = 0;
    var teamSales = 0;
  
    var i = 0;
 
    function sumTeam(node) {
      if (!node ) {
        return
      }
      teamSales += node.sales; 
      i++;
      sumTeam(node.right)
      sumTeam(node.left)
      
    }
    
    sumTeam(node);
  
    //return 'Commission of '+node.name+' = $'+commission.toFixed(2);
    
    return teamSales.toFixed(2);
    
  }
  teamSalesByNode(node){
    
    //var node = this.find(key);
    //var bonus = 0;
    var teamSales = 0;
  
    var i = 0;
 
    function sumTeam(node) {
      if (!node ) {
        return
      }
      teamSales += node.sales; 
      i++;
      sumTeam(node.right)
      sumTeam(node.left)
      
    }
    
    sumTeam(node);
  
    //return 'Commission of '+node.name+' = $'+commission.toFixed(2);
    
    return teamSales.toFixed(2);
    
  }
  teamSalesQuarter(key){
    
    var node = this.find(key);

    var teamSales = 0;
  
    var i = 0;
 
    function sumTeam(node) {
      if (!node ) {
        return
      }
      teamSales += (node.sales + node.sales1 + node.sales2)/3; 
      i++;
      sumTeam(node.right)
      sumTeam(node.left)
      
    }
    
    sumTeam(node);
  
    //return 'Commission of '+node.name+' = $'+commission.toFixed(2);
    
    return teamSales.toFixed(2);
    
  }
  teamSalesQuarterByNode(node){
    

    var teamSales = 0;
  
    var i = 0;
 
    function sumTeam(node) {
      if (!node ) {
        return
      }
      teamSales += (node.sales + node.sales1 + node.sales2); 
      i++;
      sumTeam(node.right)
      sumTeam(node.left)
      
    }
    
    sumTeam(node);
  
  
    return teamSales.toFixed(2);
    
  }

  

}


module.exports = {Node,Tree};