// Assuming you're using Node.js and Express for your backend
import prisma from "../DB/db.config.js";

// GET combined StockIn and StockOut data
export const getTransaction = async (req, res) => {
  try {
    // Fetch StockIn data
    const stockInData = await prisma.stockIn.findMany({
      include: {
        item: true, // Include additional information about the associated item if needed
      },
      orderBy: {
        created_at: "desc", // Order by created_at timestamp in descending order (latest first)
      },
    });

    // Add transaction_type field to StockIn data
    const stockInDataWithTransactionType = stockInData.map((entry) => ({
      ...entry,
      transaction_type: "in",
    }));

    // Fetch StockOut data
    const stockOutData = await prisma.stockOut.findMany({
      include: {
        item: true, // Include additional information about the associated item if needed
      },
      orderBy: {
        created_at: "desc", // Order by created_at timestamp in descending order (latest first)
      },
    });

    // Add transaction_type field to StockOut data
    const stockOutDataWithTransactionType = stockOutData.map((entry) => ({
      ...entry,
      transaction_type: "out",
    }));

    // Combine StockIn and StockOut data
    const combinedData = [...stockInDataWithTransactionType, ...stockOutDataWithTransactionType];

    // Order the combined data by created_at timestamp in descending order (latest first)
    combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.json({ status: 200, data: combinedData });
  } catch (error) {
    console.error("Error fetching combined stock data:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};


