:- use_module(library(random)).
:- use_module(library(system)).
:-use_module(library(lists)).
:-use_module(library(det)).

:-include('board&pieces.pl').
:-include('interface.pl').
:-include('gameSpecs.pl').
:-include('misc.pl').
:-include('humanToPlay.pl').
:-include('megatehLogic.pl').
:-include('machineToPlay.pl').
 
%%initializes game, asking game mode.
megateh:-
        initialize_random_seed,
        print_main,
        repeat,
        read(Ans),
        get_return_key,
        parse_answer(Ans),
        !.

%%% the players in the game
player(player_1).
player(player_2).
player(machine).


%the user name to be printed
player_userName(player_1, 'PLAYER 1').
player_userName(player_2, 'PLAYER 2').
player_userName(machine, 'MACHINE').


%%the game loop, depending on the game mode.

play(Game):-
        get_mode(Game, Mode),
        Mode = hh,
        
        get_state(Game,State),
        State \= yes,
        
        humanTurn(Game, NextGame),
        play(NextGame).

play(Game):-
        get_mode(Game, Mode),
        Mode = hm,
        
        get_state(Game,State),
        State \= yes,
        
        get_playerToPlay(Game, PlayerToPlay),
        PlayerToPlay == player_1,
        
        humanTurn(Game, NextGame),
        play(NextGame).


play(Game):-
        get_mode(Game, Mode),
        Mode = hm,
        
        get_state(Game,State),
        State \= yes,
        
        get_playerToPlay(Game, PlayerToPlay),
        PlayerToPlay == machine,
       
   
        machineTurn(Game, NextGame), 
        play(NextGame).

play(Game):-
        get_mode(Game, Mode),
        Mode = mm,
        
        get_state(Game,State),
        State \= yes,
        
        get_playerToPlay(Game, PlayerToPlay),
        PlayerToPlay == machine,
        
    
        machineTurn(Game, NextGame),
        play(NextGame).

play(Game):-
        get_pieceBoard(Game,PieceBoard),
        get_numPiecesBoard(Game,NPiecesBoard),
        get_heightBoard(Game,HeightBoard),
        display_board(PieceBoard,4,NPiecesBoard,HeightBoard),
        get_state(Game,State),
        State == yes,
        true.


        


