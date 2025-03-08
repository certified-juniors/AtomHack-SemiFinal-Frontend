import { SpaceAutoComplete } from '@/src/features';

type SearchProps = {
    onCreate: (name: string) => void;
    search: string;
    onSearch: (search: string) => void;
    spacesNames: string[];
};

export const Search = ({ onCreate, spacesNames, search, onSearch }: SearchProps) => {
    return (
        <SpaceAutoComplete
            onCreate={onCreate}
            search={search}
            onSearch={onSearch}
            spacesNames={spacesNames}
        />
    );
};
