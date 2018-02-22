$(document).ready(function() {
// Setting up all characters and variables globally
var chosenCharacter;
var currentEnemy;
var playerTurn = true;

var enemyStun = false;
var enemyStunType;
var enemyStunCD = false;

var playerStun = false;
var playerStunType;
var playerStunCD = false;
var turnNum = 0;
var enemyCharacters = [];
var ahriImg = new Image();
ahriImg.src = "images/ahripic.jpg";
var vayneImg = new Image();
vayneImg.src = "images/vaynepic.jpg";
var masterYiImg = new Image();
masterYiImg.src = "images/masteryipic.jpg";
var renektonImg = new Image();
renektonImg.src = "images/renektonpic.jpg";
var Ahri = {
  name: "Ahri",
  HP: 120,
  attacks: {
    auto: {
      name: "Auto",
      type: "damage",
      damage: 5,
      description: "Ahri auto attacks for 5 damage!"
    },
    attack1: {
      name: "Orb of Deception",
      type: "damage",
      damage: 30,
      description:
        "Ahri throws Orb of Deception at her opponent dealing 10 damage, pulls it back dealing another 20 damage!"
    },
    attack2: {
      name: "Fox-Fire",
      type: "damage",
      damage: 15,
      description:
        "Ahri summon's 3 Fox-Fires! Each one rushes at her opponent dealing 5 damage!"
    },
    attack3: {
      name: "Charm",
      type: "crowd-control",
      ccType: "daze",
      damage: 15,
      description:
        "Ahri charms her enemy, dealing 15 damage! Her opponent is in a daze for 1 turn!"
    },
    attack4: {
      name: "Soul Essence Thief",
      type: "heal",
      damage: 20,
      healAmt: 15,
      description:
        "Ahri commands a Soul Essence Thief, dealing 20 damage, and healing 15 health!"
    }
  },
  characterImage: ahriImg
};
var Vayne = {
  name: "Vayne",
  HP: 100,
  attacks: {
    auto: {
      name: "Auto",
      type: "damage",
      damage: 10,
      description: "Vayne auto attacks for 10 damage!"
    },
    attack1: {
      name: "Tumble",
      type: "damage",
      damage: 25,
      description:
        "Vayne auto attacks for 10 damage, quickly Tumbles and attck again for 15 damage!"
    },
    attack2: {
      name: "Condemn",
      type: "crowd-control",
      ccType: "stun",
      damage: 10,
      description:
        "Vayne condemns her enemy into a wall, dealing 10 damage! Her opponent is stunned for 1 turn!"
    },
    attack3: {
      name: "Vampiric Shot",
      type: "heal",
      damage: 15,
      healAmt: 15,
      description:
        "Vayne fires a Vampiric Shot, dealing 15 damage. She heals for 15 health!"
    },
    attack4: {
      name: "Silver Bolt",
      type: "damage",
      damage: 30,
      description:
        "Vayne fires a silver bolt, dealing 30 damage to her opponent!"
    }
  },
  characterImage: vayneImg
};
var MasterYi = {
  name: "Master Yi",
  HP: 95,
  attacks: {
    auto: {
      name: "Auto",
      type: "damage",
      damage: 10,
      description: "Master Yi auto attacks for 10 damage!"
    },
    attack1: {
      name: "Alpha Strike",
      type: "damage",
      damage: 20,
      description: "Master Yi attacks with Alpha Strike, dealing 20 damage!"
    },
    attack2: {
      name: "Meditate",
      type: "heal",
      damage: 0,
      healAmt: 30,
      description: "Master Yi Meditate's, healing 30 health!"
    },
    attack3: {
      name: "Double Strike",
      type: "damage",
      damage: 20,
      description:
        "Master Yi quickly strikes twice dealing 10 damage each strike!"
    },
    attack4: {
      name: "Blade Dance",
      type: "damage",
      damage: 25,
      description:
        "Master Yi quickly attacks 5 times with Blade Dance, dealing 25 damage!"
    }
  },
  characterImage: masterYiImg
};
var Renekton = {
  name: "Renekton",
  HP : 135,
  attacks : {
    auto: {
     name: "Auto",
     type: "damage",
     damage: 10,
     description: "Renekton auto attacks for 10 damage!"
    },
    attack1 : {
      name: "Cull the Meek",
      type: "heal",
      damage: 15,
      healAmt: 5,
      description: "Renekton spins Cull the Meek doing 15 damage, and heals for 8 health!"
    },
    attack2 : {
      name: "Ruthless Predator",
      type: "crowd-control",
      ccType: "stun",
      damage: 25,
      description: "Renekton ruthlessly attacks twice dealing 25 damage, stunning his opponent for 1 turn!"
    },
    attack3 : {
      name: "Slice and Dice",
      type: "damage",
      damage: 30,
      description: "Renekton dashes through his opponent, slicing and dicing for 30 damage!"
    },
    attack4 : {
      name: "Dominus",
      type: "heal",
      damage: 0,
      healAmt: 30,
      description: "Renekton gathers dark energy, and heals for 30 health!"
    }

  },
  characterImage: renektonImg
}

enemyCharacters.push(Ahri, Vayne, MasterYi, Renekton);

// SET UP FOR ALL VARIABLES AND CHARACTERS ABOVE
// SET UP FOR ALL VARIABLES AND CHARACTERS ABOVE
// SET UP FOR ALL VARIABLES AND CHARACTERS ABOVE

// Character selection function
characterSelection();
// Changes page layout to battle board and executes once a character is selected
$(".character").on("click", function() {
  $("#header").empty();
  displayChosen();
  displayBoard();
  displayEnemy();
  displayAttacks();
  atkOnClicks();
});

//ALL FUNCTIONS BELOW
//ALL FUNCTIONS BELOW
//ALL FUNCTIONS BELOW
function characterSelection() {
  $("#select-ahri").on("click", function() {
    var character = enemyCharacters.splice(0, 1);
    chosenCharacter = character[0];
  });

  $("#select-vayne").on("click", function() {
    var character = enemyCharacters.splice(1, 1);
    chosenCharacter = character[0];
  });

  $("#select-masterYi").on("click", function() {
    var character = enemyCharacters.splice(2, 1);
    chosenCharacter = character[0];
  });

  $("#select-renekton").on("click", function() {
    var character = enemyCharacters.splice(3, 1);
    chosenCharacter = character[0];
  });
}

// Function to display the chosen character
function displayChosen() {
  var chosenName = document.createElement("div");
  $(chosenName).addClass("chosen-display-name col-lg-3");
  $(chosenName).text(chosenCharacter.name);
  $("#header").append(chosenName);

  var characterImg = document.createElement("div");
  $(characterImg).addClass("inline chosen-img");
  $(characterImg).html(chosenCharacter.characterImage);
  $("#game-board").html(characterImg);

  var charHP = document.createElement("PROGRESS");
  $(charHP).attr({
    id: "health",
    value: chosenCharacter.HP,
    max: chosenCharacter.HP,
    class: "inline hp-bar"
  });
  $("#action-hp").html(charHP);
}

// Function to display the enemy character
function displayEnemy() {
  currentEnemy = enemyCharacters[0];
  var enemyName = document.createElement("div");
  $(enemyName).addClass("col-lg-3");
  $(enemyName).attr("id", "enemy-display-name");
  $(enemyName).text(currentEnemy.name);
  $("#header").append(enemyName);

  var enemyImg = document.createElement("div");
  $(enemyImg).addClass("inline");
  $(enemyImg).attr("id", "enemyImage");
  $(enemyImg).html(currentEnemy.characterImage);
  $("#game-board").append(enemyImg);

  var enemyHP = document.createElement("PROGRESS");
  $(enemyHP).attr({
    id: "enemy-health",
    value: currentEnemy.HP,
    max: currentEnemy.HP,
    class: "inline hp-bar"
  });
  $(enemyHP).html(enemyHP.value);
  $("#action-hp").append(enemyHP);
}

// Function to display the game board
function displayBoard() {
  var newHeader = document.createElement("div");
  $(newHeader).addClass("col-lg-6");
  $(newHeader).attr("id", "game-status");
  $(newHeader).text("BATTLE!");
  $("#header").append(newHeader);

  var battleLog = document.createElement("div");
  $(battleLog).attr("id", "battle-log");
  $("#game-board").append(battleLog);

  var attackBar = document.createElement("div");
  $(attackBar).addClass("row justify-content-md-center");
  $(attackBar).attr("id", "attack-bar");
  $("#action-hp").append(attackBar);

  displayTurn();
}

// Function to display attack options
function displayAttacks() {
  // Creates column for the auto-attack button
  var autoCol = document.createElement("div");
  $(autoCol).attr({
    id: "auto-col",
    class: "col-lg-3"
  });
  // Creates a button for auto-attack and puts it in the autoCol column
  var autoBtn = document.createElement("button");
  $(autoBtn).attr({
    id: "auto-btn",
    class: "btn btn-secondary",
    type: "button"
  });
  $(autoBtn).text(chosenCharacter.attacks.auto.name);
  $(autoCol).append(autoBtn);
  // Putting the Column that has the auto attack button into the attack bar
  $("#attack-bar").append(autoCol);

  // Creates column for Character attacks
  var attacksCol = document.createElement("div");
  $(attacksCol).attr({
    id: "attacks-col",
    class: "col-lg-9"
  });
  // Creats the 4 buttons for characters attacks and puts them in the attacksCol

  // Attack 1 button
  var attack1Btn = document.createElement("button");
  $(attack1Btn).attr({
    id: "attack-1-btn",
    class: "btn btn-secondary atk-btns",
    type: "button"
  });
  $(attack1Btn).text(chosenCharacter.attacks.attack1.name);
  $(attacksCol).append(attack1Btn);
  // Attack 2 button
  var attack2Btn = document.createElement("button");
  $(attack2Btn).attr({
    id: "attack-2-btn",
    class: "btn btn-secondary atk-btns",
    type: "button"
  });
  $(attack2Btn).text(chosenCharacter.attacks.attack2.name);
  $(attacksCol).append(attack2Btn);
  // Attack 3 button
  var attack3Btn = document.createElement("button");
  $(attack3Btn).attr({
    id: "attack-3-btn",
    class: "btn btn-secondary atk-btns",
    type: "button"
  });
  $(attack3Btn).text(chosenCharacter.attacks.attack3.name);
  $(attacksCol).append(attack3Btn);
  // Attack 4 button
  var attack4Btn = document.createElement("button");
  $(attack4Btn).attr({
    id: "attack-4-btn",
    class: "btn btn-secondary atk-btns",
    type: "button"
  });
  $(attack4Btn).text(chosenCharacter.attacks.attack4.name);
  $(attacksCol).append(attack4Btn);
  // Putting attack column with attack buttons into the attack bar
  $("#attack-bar").append(attacksCol);
}

// Function for auto attacking
function atkOnClicks() {
  $(".btn").on("click", function(event) {
    if (playerTurn === true && playerStun === false) {
      // For occurance of the auto-btn
      if ($(this).is("#auto-btn")) {
        if (currentEnemy.HP > 0) {
          var damageTotal;
          damageTotal = chosenCharacter.attacks.auto.damage;
          currentEnemy.HP = currentEnemy.HP - damageTotal;
          var logUpdate = document.createElement("div");
          $(logUpdate).attr("class", "row log");
          $(logUpdate).append(
            "Turn : " +
              turnNum +
              " | " +
              chosenCharacter.attacks.auto.description
          );
          $("#battle-log").prepend(logUpdate);
          $("#enemy-health").attr("value", currentEnemy.HP);
          if (currentEnemy.HP <= 0) {
            enemyDefeated();
          } else {
            if (playerStunCD === true) {
              playerStunCD = false;
            }
            playerTurn = false;
            setTimeout(function() {
              enemyAtk();
            }, 1000);
          }
        }
      }
      // For occurance of the attack-1-btn
      if ($(this).is("#attack-1-btn")) {
        switch (chosenCharacter.attacks.attack1.type) {
          case "damage":
            if (currentEnemy.HP > 0) {
              var damageTotal;
              damageTotal = chosenCharacter.attacks.attack1.damage;
              currentEnemy.HP = currentEnemy.HP - damageTotal;
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  chosenCharacter.attacks.attack1.description
              );
              $("#battle-log").prepend(logUpdate);
              $("#enemy-health").attr("value", currentEnemy.HP);
              if (currentEnemy.HP <= 0) {
                enemyDefeated();
              } else {
                if (playerStunCD === true) {
                  playerStunCD = false;
                }
                playerTurn = false;
                setTimeout(function() {
                  enemyAtk();
                }, 1000);
              }
            }

            break;
          case "crowd-control":
            if (enemyStun === false && playerStunCD === false) {
              if (currentEnemy.HP > 0) {
                var damageTotal;
                damageTotal = chosenCharacter.attacks.attack1.damage;
                currentEnemy.HP = currentEnemy.HP - damageTotal;
                var logUpdate = document.createElement("div");
                $(logUpdate).attr("class", "row log");
                $(logUpdate).append(
                  "Turn : " +
                    turnNum +
                    " | " +
                    chosenCharacter.attacks.attack1.description
                );
                $("#battle-log").prepend(logUpdate);
                $("#enemy-health").attr("value", currentEnemy.HP);

                //Getting stun type and putting in for enemy
                enemyStunType = chosenCharacter.attacks.attack1.ccType;
                if (currentEnemy.HP <= 0) {
                  enemyDefeated();
                } else {
                  playerTurn = false;
                  enemyStun = true;
                  setTimeout(function() {
                    enemyAtk();
                  }, 1000);
                }
              }
            }
            if (playerStunCD === true) {
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.name +
                  " is still focused."
              );
              $("#battle-log").prepend(logUpdate);
              playerTurn = false;
              setTimeout(function() {
                enemyAtk();
              }, 1000);
            }
            playerStunCD = true;
            break;
          case "heal":
            if (currentEnemy.HP > 0) {
              var damageTotal;
              damageTotal = chosenCharacter.attacks.attack1.damage;
              currentEnemy.HP = currentEnemy.HP - damageTotal;
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  chosenCharacter.attacks.attack1.description
              );
              $("#battle-log").prepend(logUpdate);
              $("#enemy-health").attr("value", currentEnemy.HP);
              // Regaining health
              chosenCharacter.HP =
                chosenCharacter.HP + chosenCharacter.attacks.attack1.healAmt;
              $("#health").attr("value", chosenCharacter.HP);
              if (currentEnemy.HP <= 0) {
                enemyDefeated();
              } else {
                if (playerStunCD === true) {
                  playerStunCD = false;
                }
                playerTurn = false;
                setTimeout(function() {
                  enemyAtk();
                }, 1000);
              }
            }
        }
      }
      // For occurance of the attack-2-btn
      if ($(this).is("#attack-2-btn")) {
        switch (chosenCharacter.attacks.attack2.type) {
          case "damage":
            if (currentEnemy.HP > 0) {
              var damageTotal;
              damageTotal = chosenCharacter.attacks.attack2.damage;
              currentEnemy.HP = currentEnemy.HP - damageTotal;
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  chosenCharacter.attacks.attack2.description
              );
              $("#battle-log").prepend(logUpdate);
              $("#enemy-health").attr("value", currentEnemy.HP);
              if (currentEnemy.HP <= 0) {
                enemyDefeated();
              } else {
                if (playerStunCD === true) {
                  playerStunCD = false;
                }
                playerTurn = false;
                setTimeout(function() {
                  enemyAtk();
                }, 1000);
              }
            }

            break;
          case "crowd-control":
            if (enemyStun === false && playerStunCD === false) {
              if (currentEnemy.HP > 0) {
                var damageTotal;
                damageTotal = chosenCharacter.attacks.attack2.damage;
                currentEnemy.HP = currentEnemy.HP - damageTotal;
                var logUpdate = document.createElement("div");
                $(logUpdate).attr("class", "row log");
                $(logUpdate).append(
                  "Turn : " +
                    turnNum +
                    " | " +
                    chosenCharacter.attacks.attack2.description
                );
                $("#battle-log").prepend(logUpdate);
                $("#enemy-health").attr("value", currentEnemy.HP);

                //Getting stun type and putting in for enemy
                enemyStunType = chosenCharacter.attacks.attack2.ccType;
                if (currentEnemy.HP <= 0) {
                  enemyDefeated();
                } else {
                  playerTurn = false;
                  enemyStun = true;
                  setTimeout(function() {
                    enemyAtk();
                  }, 1000);
                }
              }
            }
            if (playerStunCD === true) {
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.name +
                  " is still focused."
              );
              $("#battle-log").prepend(logUpdate);
              playerTurn = false;
              setTimeout(function() {
                playerStunCD = false;
                enemyAtk();
              }, 1000);
            }
            playerStunCD = true;

            break;
          case "heal":
            if (currentEnemy.HP > 0) {
              var damageTotal;
              damageTotal = chosenCharacter.attacks.attack2.damage;
              currentEnemy.HP = currentEnemy.HP - damageTotal;
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  chosenCharacter.attacks.attack2.description
              );
              $("#battle-log").prepend(logUpdate);
              $("#enemy-health").attr("value", currentEnemy.HP);
              // Regaining health
              chosenCharacter.HP =
                chosenCharacter.HP + chosenCharacter.attacks.attack2.healAmt;
              $("#health").attr("value", chosenCharacter.HP);
              if (currentEnemy.HP <= 0) {
                enemyDefeated();
              } else {
                if (playerStunCD === true) {
                  playerStunCD = false;
                }
                playerTurn = false;
                setTimeout(function() {
                  enemyAtk();
                }, 1000);
              }
            }
        }
      }
      // For occurance of the attack-3-btn
      if ($(this).is("#attack-3-btn")) {
        switch (chosenCharacter.attacks.attack3.type) {
          case "damage":
            if (currentEnemy.HP > 0) {
              var damageTotal;
              damageTotal = chosenCharacter.attacks.attack3.damage;
              currentEnemy.HP = currentEnemy.HP - damageTotal;
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  chosenCharacter.attacks.attack3.description
              );
              $("#battle-log").prepend(logUpdate);
              $("#enemy-health").attr("value", currentEnemy.HP);
              if (currentEnemy.HP <= 0) {
                enemyDefeated();
              } else {
                if (playerStunCD === true) {
                  playerStunCD = false;
                }
                playerTurn = false;
                setTimeout(function() {
                  enemyAtk();
                }, 1000);
              }
            }

            break;
          case "crowd-control":
            if (enemyStun === false && playerStunCD === false) {
              if (currentEnemy.HP > 0) {
                var damageTotal;
                damageTotal = chosenCharacter.attacks.attack3.damage;
                currentEnemy.HP = currentEnemy.HP - damageTotal;
                var logUpdate = document.createElement("div");
                $(logUpdate).attr("class", "row log");
                $(logUpdate).append(
                  "Turn : " +
                    turnNum +
                    " | " +
                    chosenCharacter.attacks.attack3.description
                );
                $("#battle-log").prepend(logUpdate);
                $("#enemy-health").attr("value", currentEnemy.HP);

                //Getting stun type and putting in for enemy
                enemyStunType = chosenCharacter.attacks.attack3.ccType;
                if (currentEnemy.HP <= 0) {
                  enemyDefeated();
                } else {
                  playerTurn = false;
                  enemyStun = true;
                  setTimeout(function() {
                    enemyAtk();
                  }, 1000);
                }
              }
            }
            if (playerStunCD === true) {
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.name +
                  " is still focused."
              );
              $("#battle-log").prepend(logUpdate);
              playerTurn = false;
              setTimeout(function() {
                playerStunCD = false;
                enemyAtk();
              }, 1000);
            }
            playerStunCD = true;

            break;
          case "heal":
            if (currentEnemy.HP > 0) {
              var damageTotal;
              damageTotal = chosenCharacter.attacks.attack3.damage;
              currentEnemy.HP = currentEnemy.HP - damageTotal;
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  chosenCharacter.attacks.attack3.description
              );
              $("#battle-log").prepend(logUpdate);
              $("#enemy-health").attr("value", currentEnemy.HP);
              // Regaining health
              chosenCharacter.HP =
                chosenCharacter.HP + chosenCharacter.attacks.attack3.healAmt;
              $("#health").attr("value", chosenCharacter.HP);

              if (currentEnemy.HP <= 0) {
                enemyDefeated();
              } else {
                if (playerStunCD === true) {
                  playerStunCD = false;
                }
                playerTurn = false;
                setTimeout(function() {
                  enemyAtk();
                }, 1000);
              }
            }
        }
      }
      // For occurance of the attack-4-btn
      if ($(this).is("#attack-4-btn")) {
        switch (chosenCharacter.attacks.attack4.type) {
          case "damage":
            if (currentEnemy.HP > 0) {
              var damageTotal;
              damageTotal = chosenCharacter.attacks.attack4.damage;
              currentEnemy.HP = currentEnemy.HP - damageTotal;
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  chosenCharacter.attacks.attack4.description
              );
              $("#battle-log").prepend(logUpdate);
              $("#enemy-health").attr("value", currentEnemy.HP);
              if (currentEnemy.HP <= 0) {
                enemyDefeated();
              } else {
                if (playerStunCD === true) {
                  playerStunCD = false;
                }
                playerTurn = false;
                setTimeout(function() {
                  enemyAtk();
                }, 1000);
              }
            }

            break;
          case "crowd-control":
            if (enemyStun === false && playerStunCD === false) {
              if (currentEnemy.HP > 0) {
                var damageTotal;
                damageTotal = chosenCharacter.attacks.attack4.damage;
                currentEnemy.HP = currentEnemy.HP - damageTotal;
                var logUpdate = document.createElement("div");
                $(logUpdate).attr("class", "row log");
                $(logUpdate).append(
                  "Turn : " +
                    turnNum +
                    " | " +
                    chosenCharacter.attacks.attack4.description
                );
                $("#battle-log").prepend(logUpdate);
                $("#enemy-health").attr("value", currentEnemy.HP);

                //Getting stun type and putting in for enemy
                enemyStunType = chosenCharacter.attacks.attack4.ccType;
                if (currentEnemy.HP <= 0) {
                  enemyDefeated();
                } else {
                  playerTurn = false;
                  enemyStun = true;
                  setTimeout(function() {
                    enemyAtk();
                  }, 1000);
                }
              }
            }
            if (playerStunCD === true) {
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.name +
                  " is still focused."
              );
              $("#battle-log").prepend(logUpdate);
              playerTurn = false;
              setTimeout(function() {
                playerStunCD = false;
                enemyAtk();
              }, 1000);
            }
            playerStunCD = true;

            break;
          case "heal":
            if (currentEnemy.HP > 0) {
              var damageTotal;
              damageTotal = chosenCharacter.attacks.attack4.damage;
              currentEnemy.HP = currentEnemy.HP - damageTotal;
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  chosenCharacter.attacks.attack4.description
              );
              $("#battle-log").prepend(logUpdate);
              $("#enemy-health").attr("value", currentEnemy.HP);
              // Regaining health
              chosenCharacter.HP =
                chosenCharacter.HP + chosenCharacter.attacks.attack4.healAmt;
              $("#health").attr("value", chosenCharacter.HP);
              if (currentEnemy.HP <= 0) {
                enemyDefeated();
              } else {
                if (playerStunCD === true) {
                  playerStunCD = false;
                }
                playerTurn = false;
                setTimeout(function() {
                  enemyAtk();
                }, 1000);
              }
            }
        }
      }
    }

    if (playerStun === true) {
      switch (playerStunType) {
        case "stun":
          var logUpdate = document.createElement("div");
          $(logUpdate).attr("class", "row log");
          $(logUpdate).append(
            "Turn : " +
              turnNum +
              " | " +
              chosenCharacter.name +
              " is stunned, and cannot move."
          );
          $("#battle-log").prepend(logUpdate);
          break;
        case "daze":
          var logUpdate = document.createElement("div");
          $(logUpdate).attr("class", "row log");
          $(logUpdate).append(
            "Turn : " +
              turnNum +
              " | " +
              chosenCharacter.name +
              " is in a daze, and cannot move."
          );
          $("#battle-log").prepend(logUpdate);
          break;
      }
      var logUpdate = document.createElement("div");
      $(logUpdate).attr("class", "row log");
      $(logUpdate).append(
        "Turn : " +
          turnNum +
          " | " +
          chosenCharacter.name +
          " snaps out of it, but it's too late!."
      );

      setTimeout(function() {
        playerStun = false;
        $("#battle-log").prepend(logUpdate);
        playerTurn = false;
        enemyAtk();
      }, 1000);
    }
  });
}

function enemyAtk() {
  var enemyAtks = [];
  enemyAtks.push(
    currentEnemy.attacks.auto,
    currentEnemy.attacks.attack1,
    currentEnemy.attacks.attack2,
    currentEnemy.attacks.attack3
  );
  var atkChoice = enemyAtks[Math.floor(Math.random() * enemyAtks.length)];
  if (enemyStun === false) {
    // Switch case to figure out the attack type of the attack the character used
    switch (atkChoice.type) {
      case "damage":
        if (chosenCharacter.HP > 0) {
          var dmgDone = atkChoice.damage;
          chosenCharacter.HP = chosenCharacter.HP - dmgDone;
          var logUpdate = document.createElement("div");
          $(logUpdate).attr("class", "row log");
          // Switch case to figure out which attack the computer used.
          switch (atkChoice) {
            case currentEnemy.attacks.auto:
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.attacks.auto.description
              );

              break;
            case currentEnemy.attacks.attack1:
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.attacks.attack1.description
              );

              break;
            case currentEnemy.attacks.attack2:
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.attacks.attack2.description
              );

              break;
            case currentEnemy.attacks.attack3:
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.attacks.attack3.description
              );

              break;
          }

          $("#battle-log").prepend(logUpdate);
          var newHP = document.getElementById("health");
          newHP.value = chosenCharacter.HP;

          if (chosenCharacter.HP <= 0) {
            gameOver();
          } else {
            if (enemyStunCD === true) {
              enemyStunCD = false;
            }
            playerTurn = true;
            displayTurn();
          }
        }

        break;

      case "crowd-control":
        if (enemyStunCD === false) {
          if (chosenCharacter.HP > 0) {
            var dmgDone = atkChoice.damage;
            chosenCharacter.HP = chosenCharacter.HP - dmgDone;
            var logUpdate = document.createElement("div");
            $(logUpdate).attr("class", "row log");
            // Switch case to figure out which attack the computer used.
            switch (atkChoice) {
              case currentEnemy.attacks.auto:
                var logUpdate = document.createElement("div");
                $(logUpdate).attr("class", "row log");
                $(logUpdate).append(
                  "Turn : " +
                    turnNum +
                    " | " +
                    currentEnemy.attacks.auto.description
                );

                break;
              case currentEnemy.attacks.attack1:
                var logUpdate = document.createElement("div");
                $(logUpdate).attr("class", "row log");
                $(logUpdate).append(
                  "Turn : " +
                    turnNum +
                    " | " +
                    currentEnemy.attacks.attack1.description
                );
                playerStunType = currentEnemy.attacks.attack1.ccType;
                break;
              case currentEnemy.attacks.attack2:
                var logUpdate = document.createElement("div");
                $(logUpdate).attr("class", "row log");
                $(logUpdate).append(
                  "Turn : " +
                    turnNum +
                    " | " +
                    currentEnemy.attacks.attack2.description
                );
                playerStunType = currentEnemy.attacks.attack2.ccType;
                break;
              case currentEnemy.attacks.attack3:
                var logUpdate = document.createElement("div");
                $(logUpdate).attr("class", "row log");
                $(logUpdate).append(
                  "Turn : " +
                    turnNum +
                    " | " +
                    currentEnemy.attacks.attack3.description
                );
                playerStunType = currentEnemy.attacks.attack3.ccType;
                break;
            }

            $("#battle-log").prepend(logUpdate);
            var newHP = document.getElementById("health");
            newHP.value = chosenCharacter.HP;

            // Applying stun to player
            playerStun = true;

            if (chosenCharacter.HP <= 0) {
              gameOver();
            } else {
              playerTurn = true;
              displayTurn();
            }
          }
        }
        if (enemyStunCD === true) {
          var logUpdate = document.createElement("div");
          $(logUpdate).attr("class", "row log");
          $(logUpdate).append(
            "Turn : " +
              turnNum +
              " | " +
              chosenCharacter.name +
              " is still focused."
          );
          $("#battle-log").prepend(logUpdate);
          setTimeout(function() {
            enemyStunCD = false;
            playerTurn = true;
            displayTurn();
          }, 1000);
        }
        enemyStunCD = true;
        break;

      case "heal":
        var heal;
        if (chosenCharacter.HP > 0) {
          var dmgDone = atkChoice.damage;
          chosenCharacter.HP = chosenCharacter.HP - dmgDone;
          var logUpdate = document.createElement("div");
          $(logUpdate).attr("class", "row log");
          // Switch case to figure out which attack the computer used.
          switch (atkChoice) {
            case currentEnemy.attacks.auto:
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.attacks.auto.description
              );

              break;
            case currentEnemy.attacks.attack1:
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.attacks.attack1.description
              );
              heal = currentEnemy.attacks.attack1.healAmt;
              break;
            case currentEnemy.attacks.attack2:
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.attacks.attack2.description
              );
              heal = currentEnemy.attacks.attack2.healAmt;
              break;
            case currentEnemy.attacks.attack3:
              var logUpdate = document.createElement("div");
              $(logUpdate).attr("class", "row log");
              $(logUpdate).append(
                "Turn : " +
                  turnNum +
                  " | " +
                  currentEnemy.attacks.attack3.description
              );
              heal = currentEnemy.attacks.attack3.healAmt;
              break;
          }
          // Applying heal
          currentEnemy.HP = currentEnemy.HP + heal;
          var regen = document.getElementById("enemy-health");
          regen.value = currentEnemy.HP;

          //
          $("#battle-log").prepend(logUpdate);
          var newHP = document.getElementById("health");
          newHP.value = chosenCharacter.HP;

          if (chosenCharacter.HP <= 0) {
            gameOver();
          } else {
            if (enemyStunCD === true) {
              enemyStunCD = false;
            }
            playerTurn = true;
            displayTurn();
          }
        }

        break;
    }
  } else {
    switch (enemyStunType) {
      case "stun":
        var logUpdate = document.createElement("div");
        $(logUpdate).attr("class", "row log");
        $(logUpdate).append(
          "Turn : " +
            turnNum +
            " | " +
            currentEnemy.name +
            " is stunned, and cannot move."
        );
        $("#battle-log").prepend(logUpdate);

        break;
      case "daze":
        var logUpdate = document.createElement("div");
        $(logUpdate).attr("class", "row log");
        $(logUpdate).append(
          "Turn : " +
            turnNum +
            " | " +
            currentEnemy.name +
            " is in a daze, and cannot move."
        );
        $("#battle-log").prepend(logUpdate);

        break;
    }
    setTimeout(function() {
      enemyStun = false;
      var logUpdate = document.createElement("div");
      $(logUpdate).attr("class", "row log");
      $(logUpdate).append(
        "Turn : " +
          turnNum +
          " | " +
          currentEnemy.name +
          " snaps out of it, but it's too late!."
      );
      displayTurn();
      $("#battle-log").prepend(logUpdate);
      playerTurn = true;
    }, 1000);
  }
}

function displayTurn() {
  var currentTurn = document.createElement("div");
  $(currentTurn).attr("id", "turn-number");
  turnNum++;
  $(currentTurn).text(turnNum);
  $("#turn-bar").html("<p>Turn : &nbsp; </p>");
  $("#turn-bar").append(currentTurn);
}

//Function that activates when you defeat an enemy
function enemyDefeated() {
  if (enemyCharacters[1] !== undefined) {
    $("#game-status").html("YOU WON!");
    var logUpdate = document.createElement("div");
    $(logUpdate).attr("class", "row log win");
    $(logUpdate).append(
      "Turn : " +
        turnNum +
        " | " +
        "You've defeated " +
        currentEnemy.name +
        "! " +
        enemyCharacters[1].name +
        " enters the battlefield!"
    );
    $("#battle-log").prepend(logUpdate);
    setTimeout(function() {
      $("#game-status").html("BATTLE!");
      var defeated = enemyCharacters.splice(0, 1);
      $("#enemy-display-name").remove();
      $("#enemyImage").remove();
      $("#enemy-health").remove();
      displayEnemy();
    }, 3000);
  } else {
    $("#game-status").html("YOU WON!");
    var logUpdate = document.createElement("div");
    $(logUpdate).attr("class", "row log win-final");
    $(logUpdate).append(
      "Turn : " +
        turnNum +
        " | " +
        "You've defeated " +
        currentEnemy.name +
        "! " +
        " There are no more enemies to battle! Good Job!"
    );
    $("#battle-log").prepend(logUpdate);
    var newGame = document.createElement("button");
    $(newGame).attr({
      id: "new-game-btn",
      class: "btn btn-secondary",
      type: "button"
    });
    $(newGame).html("Click to replay!");
    $("#attack-bar").html(newGame);

    $(newGame).on("click", function() {
      location.reload();
    });
  }
}

function gameOver() {
  $("#game-status").html("YOU'VE BEEN DEFEATED");
  var logUpdate = document.createElement("div");
  $(logUpdate).attr("class", "row log win-final");
  $(logUpdate).append(
    "Turn : " +
      turnNum +
      " | " +
      "You've been defeated. " +
      " Click the replay button to try again, if you still have it in you..."
  );
  $("#battle-log").prepend(logUpdate);
  var newGame = document.createElement("button");
  $(newGame).attr({
    id: "new-game-btn",
    class: "btn btn-secondary",
    type: "button"
  });
  $(newGame).html("Click to replay!");
  $("#attack-bar").html(newGame);

  $(newGame).on("click", function() {
    location.reload();
  });
}
//END OF DOCUMENT
//END OF DOCUMENT
});
