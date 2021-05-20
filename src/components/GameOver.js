import { Fragment } from "react";

export default function GameOver(props) {

    return (
        props.show ?
            <div id="gameOver">
                <div className="txtGameOver">
                    Parabéns você concluiu o jogo!
                </div>
                <button id="restartGame" onClick={props.handleRestart}>Jogue Novamente</button>
            </div>
            : <Fragment />
    )
}