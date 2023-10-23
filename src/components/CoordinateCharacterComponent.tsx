import React, {FC} from 'react';

interface CoordinateCharacterProps {
    coordinateCharacter: string;
}

const CoordinateCharacterComponent: FC<CoordinateCharacterProps> = ({coordinateCharacter}) => {
    return (
        <div className="coordinate-character">
            {coordinateCharacter}
        </div>
    );
};

export default CoordinateCharacterComponent;