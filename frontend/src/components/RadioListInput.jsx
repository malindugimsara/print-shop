import React, { useState } from "react";

export default function RadioListInput({
    title,
    items,
    selected,
    onChange,
    allowAdd = false,
    placeholder = "Add new item...",
    addItemCallback,
    index = 0, // pass index to make unique names if needed
}) {
    const [showInput, setShowInput] = useState(false);
    const [newItem, setNewItem] = useState("");

    const handleAdd = () => {
        if (!newItem.trim()) return;
        addItemCallback(newItem);
        setNewItem("");
        setShowInput(false);
    };

    return (
        <div className="p-5 border rounded-xl">
            <h2 className="text-lg font-bold text-[#D16BA5] mb-3">{title}</h2>

            <div className="space-y-2 max-h-56 overflow-y-auto">
                {items.map((item, idx) => (
                    <label key={idx} className="flex items-center">
                        <input
                            type="radio"
                            name={`${title}-${index}`} // unique name per group
                            className="mr-2"
                            checked={selected === item}
                            onChange={() => onChange(item)}
                        />
                        {item}
                    </label>
                ))}
            </div>

            {allowAdd && (
                <>
                    {showInput && (
                        <div className="flex mt-3 gap-2">
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                className="flex-1 p-2 border rounded"
                                placeholder={placeholder}
                            />
                            <button
                                onClick={handleAdd}
                                className="px-4 py-2 text-white bg-[#48CAE4] rounded"
                            >
                                Add
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => setShowInput(!showInput)}
                        className="mt-4 w-full py-2 bg-[#48CAE4] text-white rounded"
                    >
                        + Add Item
                    </button>
                </>
            )}
        </div>
    );
}
