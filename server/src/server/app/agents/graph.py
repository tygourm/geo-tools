from typing import Literal

from geojson import LineString, Point, Polygon
from geojson.utils import generate_random
from langchain.agents import create_agent
from langchain_core.language_models import BaseChatModel
from langchain_core.tools import tool
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph.state import CompiledStateGraph


@tool(parse_docstring=True)
def add(a: int, b: int) -> int:
    """Add two numbers.

    Args:
        a: The first number.
        b: The second number.

    Returns:
        The sum of the two numbers.

    """
    return a + b


@tool(parse_docstring=True)
def sub(a: int, b: int) -> int:
    """Subtract two numbers.

    Args:
        a: The first number.
        b: The second number.

    Returns:
        The difference of the two numbers.

    """
    return a - b


@tool(parse_docstring=True)
def random_geojson(
    feature_type: Literal["Point", "LineString", "Polygon"],
) -> Point | LineString | Polygon:
    """Generate a random GeoJSON feature of the specified type.

    Args:
        feature_type: The type of GeoJSON feature to generate.
        Must be one of "Point", "LineString", or "Polygon".

    Returns:
        A random GeoJSON feature of the specified type.

    """
    return generate_random(feature_type)


def create_graph(model: BaseChatModel) -> CompiledStateGraph:
    return create_agent(
        model,
        [add, sub, random_geojson],
        checkpointer=InMemorySaver(),
    )
