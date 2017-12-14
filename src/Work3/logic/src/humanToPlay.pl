

%%%% predicates to run when the player is a human.
humanTurn(Game,NextGame):-
        get_actual_board(Game, PieceBoard, HeightBoard, NPBoard),
        display_board(PieceBoard,4,NPBoard,HeightBoard),
        repeat,
        display_actualInfo(Game),nl,
        ask_position(Row, Col),
        ask_piece(NewPiece),
        move(Row,Col,NewPiece,Game,NextGame),
        !.

%%% gets the desired column and row to move a piece, from an input.
ask_position(Row, Col):-
        write('Where do you want to put your piece?'),nl,
        write('Row: '),
        read(TempRow),
        get_return_key,
        write('Col: '),
        get_col(Col),
        integer(TempRow),
        Row is 4 - TempRow,
        parse_position(Row,Col).

%%% gets the desired piece to move, from an input.
ask_piece(Piece):-
        write('And what piece?'),nl,
        write('       f for flat'),nl,
        write('       h for holed'),nl,
        write('       ff for double-flat'),nl,
        write('       hh for double-holed.'),nl,
        read(TempPiece),
        parse_piece(TempPiece,Piece),
        get_return_key.

