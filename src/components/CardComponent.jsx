import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Card = ({
    id,
    title,
    subtitle,
    description,
    emotions,
    tags,
    imageUrl,
    onDeleteItem,
    onEditItem,

}) => {
    const handleDelete = () => {
        if (onDeleteItem) {
            onDeleteItem(id);
        }
    };

    const handleEdit = () => {
        if (onEditItem) {
            onEditItem(id);
        }
    };

    return (
        <div className="card">
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                {subtitle && <p className="card-subtitle">{subtitle}</p>}
                {description && <p className="card-description">{description}</p>}

                {/* Display emotions */}
                {emotions && emotions.length > 0 && (
                    <p className="card-emotions">
                        Emotions: {emotions.join(", ")}
                    </p>
                )}

                {/* Display tags */}
                {tags && tags.length > 0 && (
                    <p className="card-tags">
                        Tags: {tags.join(", ")}
                    </p>
                )}

                {/* Display image */}
                {imageUrl && (
                    <div className="card-image-container">
                        <img src={imageUrl} alt="Dream Image" className="card-image" />
                    </div>
                )}

                <div className="card-actions">
                    {/* Edit Button */}
                    <EditIcon className="edit-icon" onClick={handleEdit} />

                    {/* Delete Button */}
                    <DeleteIcon className="delete-icon" onClick={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default Card;