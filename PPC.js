/*               Opções               */

var BT_CH_Preview = document.getElementById("CH_preview");
var BT_SUB_Preview = document.getElementById("SUB_preview");

var Carga_Horaria = document.getElementsByClassName("CH");
var Legendas = document.getElementsByClassName("Espace");

var display_CH = false;
var display_Legenda = false;

BT_CH_Preview.addEventListener('click', function (evento) {

    if(!display_CH){
        for(let i = 0; i < Carga_Horaria.length; i++){
            Carga_Horaria[i].style.setProperty('display', 'contents');
            display_CH = true;
        }
    }else{
        for(let i = 0; i < Carga_Horaria.length; i++){
            Carga_Horaria[i].style.setProperty('display', 'none')
            display_CH = false;
        } 
    }

});

BT_SUB_Preview.addEventListener('click', () => {

    console.log("Entrou");

    if(!display_Legenda){
        console.log("Entrou 1");
        for(let i = 0; i < Carga_Horaria.length; i++){
            Legendas[i].style.setProperty('display', 'flex');
            display_Legenda = true;
        }
    }else{
        console.log("Entrou 2");
        for(let i = 0; i < Carga_Horaria.length; i++){
            Legendas[i].style.setProperty('display', 'none')
            display_Legenda = false;
        } 
    }

});

/*               Hover e Requisitos               */

var Disciplinas = document.getElementsByClassName("Disciplina");
var Semestres = document.getElementsByClassName("Split");

//Primeira linha = Posição que Requista
//-1 = Requisito inexistente
var Lista_Requisitos = [
    [5, 0, -1],
    [6, 0, -1],
    [7, 2, -1],
    [11, 8, -1],
    [12, 2, -1],
    [13, 7, -1],
    [16, 8, -1],
    [17, 8, 7],
    [18, 9, 7],
    [21, 15, 7],
    [22, 11, 13],
    [23, 18, -1],
    [24, 18, 7],
    [25, 13, -1],
    [26, 7, 1],
    [27, 12, -1],
    [28, 24, -1],
    [29, 24, -1]
];

// Verifica os requisitos de uma disciplina
function VerificaRequisito(position){
    
    var requisitados = [];
    var encontrado = false;

    for(let j = 0; j < 18; j++){
        if(Lista_Requisitos[j][0] == position){
            for(let k = 1; k < 3; k++){
                if(Lista_Requisitos[j][k] != -1){
                    requisitados.push(Lista_Requisitos[j][k]);
                    var aux = VerificaRequisito(Lista_Requisitos[j][k]);

                    for(let l = 0; l < aux.length; l++){
                        if(aux[l] != -1){
                            requisitados.push(aux[l]);
                        }
                    }

                }
            }
            encontrado = true;
            break;
        }
    }

    if(encontrado){
        return requisitados;
    }else{
        return -1;
    }
}

function PseudoHover(position){
    Disciplinas[position].style.setProperty('height', '20%');
    Disciplinas[position].style.setProperty('width', '100%');
    Disciplinas[position].style.setProperty('font-size', '63%');
    Disciplinas[position].style.setProperty('background-color', 'rgba(255,255, 255, 0.1)');
}

function BackToNormal(position){
    Disciplinas[position].style.setProperty('height', '17%');
    Disciplinas[position].style.setProperty('width', '80%');
    Disciplinas[position].style.setProperty('font-size', '50%');
    Disciplinas[position].style.setProperty('background-color', 'rgba(0, 0, 0, 0.1)');
}

for(let i = 0; i < Disciplinas.length; i++){

    Disciplinas[i].addEventListener('mouseenter', () => {

        if(i < 25){
            Semestres[Math.floor(i/5)].style.setProperty('border', '2px solid rgba(255, 255, 255, 0.6)');
        }else if(i < 29){
            Semestres[5].style.setProperty('border', '2px solid rgba(255, 255, 255, 0.6)');
        }else{
            Semestres[6].style.setProperty('border', '2px solid rgba(255, 255, 255, 0.6)');
        }

        if(Disciplinas[i].classList.contains("Requisita")){

            var Resultado = VerificaRequisito(i);

            for(let l = 0; l < Resultado.length; l++){
                PseudoHover(Resultado[l]);
                Carga_Horaria[Resultado[l]].style.setProperty('display', 'contents');
                Legendas[Resultado[l]].style.setProperty('display', 'flex');
            }
            PseudoHover(i);
            Carga_Horaria[i].style.setProperty('display', 'contents');
            Legendas[i].style.setProperty('display', 'flex');
                
        }else{
            PseudoHover(i);
            Carga_Horaria[i].style.setProperty('display', 'contents');
            Legendas[i].style.setProperty('display', 'flex');
        }

    });
}

for(let i = 0; i < Disciplinas.length; i++){

    Disciplinas[i].addEventListener('mouseleave', () => {

        if(Disciplinas[i].classList.contains("Requisita")){
            for(let j = 0; j < Disciplinas.length; j++){
                BackToNormal(j);

                if(!display_CH){
                    Carga_Horaria[j].style.setProperty('display', 'none');
                }
                if(!display_Legenda){
                    Legendas[j].style.setProperty('display', 'none');
                }

            }
        }else{

            BackToNormal(i);

            if(!display_CH){
                Carga_Horaria[i].style.setProperty('display', 'none');
            }
            if(!display_Legenda){
                Legendas[i].style.setProperty('display', 'none');
            }
    
        }

        for(let j = 0; j < Semestres.length; j++){
            Semestres[j].style.setProperty('border', '1px solid rgba(255, 255, 255, 0.4)'); 
        }

    });

}

/*               Modals               */

var BT_CCD = document.getElementsByClassName("BT_CCD");
var Close_BT_CCD = document.querySelector("dialog button");

var Modal_Disciplinas = document.getElementById("Info_Disciplina");
var Modal_CCDs = document.getElementById("Info_CCD");

for(var i = 0; i < 4; i++){
    BT_CCD[i].onclick = function(){
        Modal_CCDs.showModal();
    }
    
}

Close_BT_CCD.onclick = function(){
    Modal_CCDs.close();
}
