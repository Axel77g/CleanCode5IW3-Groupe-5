import React, {useEffect, useRef, useState} from "react";
import Chip from "@/components/Chip";
import Input from "@/components/Input";

export default function ReferenceSelector(props: { onChange: (reference: string) => void, label: string, reference: string }) {
    const [options, setOptions] = useState<{ reference: string, name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState(props.reference ?? "");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const [selectedReference, setSelectedReference] = useState<{ reference: string, name: string } | null>(null)


    useEffect(() => {

        if (query.length === 0) {
            setLoading(false);
            setOptions([]);
            return;
        }

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const id = setTimeout(async () => {
            const response = await fetch(`/api/inventory-spare-parts?search=${query}`);
            const data = await response.json();
            setOptions(data);
            setLoading(false);
        }, 300);

        setTimeoutId(id);
    }, [query]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLoading(true);
        setQuery(e.target.value);
    }

    function handleOptionClick(element : {reference : string, name: string}) {
        props.onChange(element.reference);
        searchRef.current!.value = element.reference;
        setSelectedReference(element)
        setOptions([]);
    }

    const inputPrefix = selectedReference ? <div><Chip>{selectedReference.name}</Chip></div> : null
    const inputMessage = !selectedReference ? 'Aucune référence sélectionnée'  : undefined
    return (
        <div>
            <Input message={inputMessage} prefix={inputPrefix} type="text" ref={searchRef} label={props.label} value={query} onChange={handleInputChange} placeholder="Rechercher une référence ou un nom ..."  name={"$SEARCH_REF"}/>
            {(options.length > 0 || loading) && (
                <ul className="absolute bg-white border border-gray-300 rounded-md mt-[-10px] w-full z-10">
                    {options.map(option => (
                        <li
                            key={option.reference}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        >
                            {option.name} (ref: {option.reference})
                        </li>
                    ))}
                    {loading && <li className="px-4 py-2">Chargement...</li>}
                </ul>
            )}
        </div>
    );
}
