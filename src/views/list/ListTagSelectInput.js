
export const ListTagSelectInput = ({ tags, selectedTags, setSelectedTags }) => {

  const handleTagSelect = (e) => {
    let selectedTag = e.target.value;

    let editableTags = [...selectedTags];
    let index = 0;

    while (editableTags[index] !== selectedTag) {
      if (index === editableTags.length - 1) break;
      index = index++;
    }

    (editableTags.includes(selectedTag))
      ? editableTags.splice(index, 1)
      : editableTags.push(selectedTag);

    setSelectedTags(editableTags);
  }

  return (
    <select
      multiple={true}
      value={selectedTags}
      onChange={handleTagSelect}
      className="form-select"
      aria-label="multiple tag select"
    >
    {tags.map((tag, index) => (
      <option key={tag.title} value={tag.title}>{ tag.title }</option>
    ))}
    </select>
  );
}
