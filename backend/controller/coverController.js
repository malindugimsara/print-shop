import Cover from "../modules/cover.js";

export const getAllCovers = async (req, res) => {
    try {
        const covers = await Cover.find().sort({ name: 1 });
        res.json(covers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCover = async (req, res) => {
    try {
        const cover = new Cover({ name: req.body.name });
        const saved = await cover.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export async function UpdateCover(req, res) {
  const coverID = req.params.coverID;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Cover name cannot be empty" });
  }

  try {
    // Check if another cover with same name exists
    const duplicate = await Cover.findOne({ name });
    if (duplicate && duplicate._id.toString() !== coverID) {
      return res.status(400).json({ message: "Cover name already exists" });
    }

    const updatedCover = await Cover.findByIdAndUpdate(
      coverID,
      { name },
      { new: true } // return updated document
    );

    if (!updatedCover) {
      return res.status(404).json({ message: "Cover not found" });
    }

    res.json(updatedCover);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export function DeleteCover(req, res) {
    const coverID = req.params.coverID;
    Cover.findByIdAndDelete(coverID)
        .then((deletedCover) => {
            if (!deletedCover) {
                return res.status(404).json({ message: "Cover not found" });
            }
            res.json({ message: "Cover deleted successfully" });
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
}
