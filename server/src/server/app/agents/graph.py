from langchain.agents import create_agent
from langchain_core.language_models import BaseChatModel
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph.state import CompiledStateGraph


def create_graph(model: BaseChatModel) -> CompiledStateGraph:
    return create_agent(model, checkpointer=InMemorySaver())
