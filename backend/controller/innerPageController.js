import Inner from "../modules/innerPage.js";

export const getAllInners = async (req, res) => {
    try {
        const inners = await Inner.find().sort({ name: 1 });
        res.json(inners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createInner = async (req, res) => {
    try {
        const inner = new Inner({ name: req.body.name });
        const saved = await inner.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export async function updateInner(req, res) {
  const innerID = req.params.innerID;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Inner name cannot be empty" });
  }

  try {
    // Check if another inner with same name exists
    const duplicate = await Inner.findOne({ name });
    if (duplicate && duplicate._id.toString() !== innerID) {
      return res.status(400).json({ message: "Inner name already exists" });
    }

    const updatedInner = await Inner.findByIdAndUpdate(
      innerID,
      { name },
      { new: true } // return updated document
    );

    if (!updatedInner) {
      return res.status(404).json({ message: "Inner not found" });
    }

    res.json(updatedInner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export function deleteInner(req, res) {
    const innerID = req.params.innerID;
    Inner.findByIdAndDelete(innerID)
        .then((deletedInner) => {
            if (!deletedInner) {
                return res.status(404).json({ message: "Inner not found" });
            }
            res.json({ message: "Inner deleted successfully" });
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
}
