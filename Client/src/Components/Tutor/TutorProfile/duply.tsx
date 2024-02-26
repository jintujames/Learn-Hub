<div className="mt-2">
    <label className="block text-sm text-gray-600" htmlFor="cus_email">
        Description
    </label>
    <input
        className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
        id="description"
        name="description"
        type="text"
        placeholder="Description"
        aria-label="description"
    />
    <div className="mt-2">
        <label className="block text-sm text-gray-600" htmlFor="fileInput">
            Choose Image or Video
        </label>
        <input
            className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
            id="fileInput"
            name="fileInput"
            type="file"
            accept="image/*, video/*" 
            aria-label="fileInput"
        />
    </div>
</div>