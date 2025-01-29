/* import React from 'react';
import { PortableTextEditor, EditorChange } from '@sanity/portable-text-editor';
import { PortableTextBlock } from '@sanity/types';

interface WithBlockSelectorProps {
  value: PortableTextBlock[];
  onChange: (newValue: PortableTextBlock[]) => void;
  blockPreviews: Array<{
    title: string;
    blocks: Record<string, { description: string; imageURL: string }>;
  }>;
  showOther: boolean;
  excludedBlocks: string[];
  text: {
    addItem: string;
  };
  replaceQueries: Array<{
    level: string;
    query: string;
  }>;
  schemaType: {
    name: string;
    type: string;
    of: Array<{ type: string }>;
  };
}

const WithBlockSelector: React.FC<WithBlockSelectorProps> = ({
  value,
  onChange,
  blockPreviews,
  showOther,
  excludedBlocks,
  text,
  replaceQueries,
  schemaType,
}) => {
  const handleChange = (change: EditorChange) => {
    if (change.type === 'set' && Array.isArray(change.value)) {  // Ensure it's an array
      onChange(change.value as PortableTextBlock[]);
    }
  };

  return (
    <div>
      <PortableTextEditor
        value={value}
        onChange={handleChange}
        schemaType={schemaType}  // Ensure this is a valid schema object
        blockPreviews={blockPreviews}
        showOther={showOther}
        excludedBlocks={excludedBlocks}
        text={text}
        replaceQueries={replaceQueries}
      />
    </div>
  );
};

export default WithBlockSelector;
*/