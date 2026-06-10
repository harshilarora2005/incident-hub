import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox";

const users = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
];

export default function AssigneeSelect() {
    const anchor = useComboboxAnchor();
    return (
        <Combobox
            multiple
            autoHighlight
            items={users}
            defaultValue={[users[0]]}
        >
            <ComboboxChips
                ref={anchor}
                className="w-full"
            >
                <ComboboxValue>
                    {(values) => (
                        <>
                            {values.map((value) => (
                                <ComboboxChip key={value}>
                                    {value}
                                </ComboboxChip>
                            ))}

                            <ComboboxChipsInput />
                        </>
                    )}
                </ComboboxValue>
            </ComboboxChips>

            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>
                    No items found.
                </ComboboxEmpty>

                <ComboboxList>
                    {(item) => (
                        <ComboboxItem
                            key={item}
                            value={item}
                        >
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}